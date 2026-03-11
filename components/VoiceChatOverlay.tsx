
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { Mic, MicOff, X, Volume2, Loader2 } from 'lucide-react';

interface VoiceChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  marketData?: any;
}

const VoiceChatOverlay: React.FC<VoiceChatOverlayProps> = ({ isOpen, onClose, marketData }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState<string | null>(null);

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      startSession();
    }
    return () => {
      stopSession();
    };
  }, [isOpen]);

  const startSession = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      
      const systemInstruction = `
        You are a helpful agricultural assistant for Myanmar farmers. 
        You have access to the following market data: ${JSON.stringify(marketData)}.
        Answer questions about crop prices, market trends, and farming advice in Myanmar Unicode.
        Be concise and friendly. Use a natural speaking tone.
      `;

      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            startMic();
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                  const base64Data = part.inlineData.data;
                  const binaryString = atob(base64Data);
                  const bytes = new Uint8Array(binaryString.length);
                  for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                  }
                  const pcmData = new Int16Array(bytes.buffer);
                  audioQueueRef.current.push(pcmData);
                  if (!isPlayingRef.current) {
                    playNextInQueue();
                  }
                }
              }
            }

            if (message.serverContent?.interrupted) {
              audioQueueRef.current = [];
              isPlayingRef.current = false;
            }
            
            // Handle transcriptions if enabled
            if (message.serverContent?.modelTurn?.parts?.[0]?.text) {
                setAiResponse(prev => prev + message.serverContent?.modelTurn?.parts?.[0]?.text);
            }
          },
          onclose: () => {
            setIsConnected(false);
            stopMic();
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setError("ချိတ်ဆက်မှု အမှားအယွင်းရှိနေပါသည်။");
            setIsConnecting(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction,
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Failed to connect to Gemini Live:", err);
      setError("AI နှင့် ချိတ်ဆက်၍မရပါ။");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    stopMic();
    setIsConnected(false);
    setIsConnecting(false);
    audioQueueRef.current = [];
  };

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        // Convert Float32 to Int16 PCM
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
        }
        
        // Convert to Base64
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
        
        if (sessionRef.current) {
          sessionRef.current.sendRealtimeInput({
            media: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
          });
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
      setIsListening(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("မိုက်ခရိုဖုန်း အသုံးပြုခွင့် မရရှိပါ။");
    }
  };

  const stopMic = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsListening(false);
  };

  const playNextInQueue = async () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      return;
    }

    isPlayingRef.current = true;
    const pcmData = audioQueueRef.current.shift()!;
    
    if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    }
    
    const audioContext = audioContextRef.current;
    const buffer = audioContext.createBuffer(1, pcmData.length, 24000);
    const channelData = buffer.getChannelData(0);
    
    for (let i = 0; i < pcmData.length; i++) {
      channelData[i] = pcmData[i] / 0x7FFF;
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.onended = () => {
      playNextInQueue();
    };
    source.start();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-[300px] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col items-center p-6 relative border border-slate-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors border border-slate-100 shadow-sm z-20"
          aria-label="Close"
        >
          <X size={18} className="text-slate-500" />
        </button>

        <div className="mt-4 mb-8 flex flex-col items-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center relative ${isConnected ? 'bg-emerald-50' : 'bg-slate-50'}`}>
            {isConnecting ? (
              <Loader2 size={32} className="text-emerald-500 animate-spin" />
            ) : isConnected ? (
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                <div className="bg-emerald-600 p-6 rounded-full relative z-10 shadow-lg shadow-emerald-100">
                  <Mic size={32} className="text-white" />
                </div>
              </div>
            ) : (
              <div className="bg-slate-200 p-6 rounded-full">
                <MicOff size={32} className="text-slate-400" />
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-black text-slate-900 mt-6 mb-1">
            {isConnecting ? 'ချိတ်ဆက်နေသည်...' : isConnected ? 'နားထောင်နေသည်...' : 'အဆင်သင့်မဖြစ်သေးပါ'}
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider text-center px-4">
            {error || 'အသံဖြင့် မေးမြန်းနိုင်ပါသည်'}
          </p>
        </div>

        <div className="w-full bg-slate-50 rounded-2xl p-4 min-h-[80px] flex flex-col gap-3">
          {aiResponse && (
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Volume2 size={12} className="text-emerald-600" />
              </div>
              <p className="text-xs text-slate-700 font-bold leading-relaxed myanmar-text">
                {aiResponse}
              </p>
            </div>
          )}
          {!aiResponse && !isConnecting && isConnected && (
            <p className="text-[10px] text-slate-400 font-bold italic text-center mt-2">
              "ယနေ့ ပဲစင်းငုံစျေး ဘယ်လောက်လဲ?"
            </p>
          )}
        </div>

        <div className="mt-6 w-full">
          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white text-xs font-black py-3.5 rounded-xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            ပိတ်မည်
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatOverlay;
