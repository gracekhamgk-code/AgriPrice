
import { GoogleGenAI, Type } from "@google/genai";

// Use an environment variable for the API key as per instructions.
// The SDK instance is created inside functions to ensure the latest key is used if it changes.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export interface CropUpdate {
  id: string;
  currentPrice: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  source: string;
  confidence: number;
}

export interface MarketAnalysis {
  advice: string;
  reasoning: string;
  globalConfidence: number;
  sources: { title: string; uri: string }[];
  cropUpdates: CropUpdate[];
}

export interface LivePrice {
  name: string;
  price: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

// Simple in-memory cache to prevent frequent API calls (429 mitigation)
let cachedAnalysis: MarketAnalysis | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * AI-driven market insight with search grounding and structured JSON output.
 */
export const getMarketInsight = async (): Promise<MarketAnalysis | null> => {
  const now = Date.now();
  if (cachedAnalysis && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedAnalysis;
  }

  try {
    const ai = getAI();
    const prompt = `
      မြန်မာနိုင်ငံ၏ ၂၀၂၆ ခုနှစ်၊ ဖေဖော်ဝါရီလအတွင်း စိုက်ပျိုးရေးစျေးကွက်ကို အသေးစိတ် ရှာဖွေပေးပါ။
      အောက်ပါ သီးနှံများအတွက် ဘုရင့်နောင် သို့မဟုတ် မန္တလေးကုန်စည်ဒိုင်ရှိ ယနေ့ပေါက်ဈေးအမှန်များကို ရှာပါ:
      1. ပဲစင်းငုံနီ (Pigeon Pea)
      2. မတ်ပဲ (Black Gram FAQ)
      3. နှမ်းဖြူ (White Sesame)
      4. ကြက်သွန်ဖြူ (Garlic - Shan/Taunggyi)
      
      အချက်အလက်များကို ခွဲခြမ်းစိတ်ဖြာရာတွင် အိန္ဒိယဝယ်လိုအား၊ USD/MMK ငွေလဲလှယ်နှုန်း နှင့် သီးနှံပေါ်ဦးပေါ်ဖျား အခြေအနေတို့ကို ထည့်သွင်းစဉ်းစားပေးပါ။
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Flash has higher rate limits than Pro
      contents: prompt,
      config: {
        systemInstruction: "You are a professional agricultural market analyst in Myanmar. Provide REAL-TIME data for February 2026 in Myanmar Unicode. Use Google Search.",
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING, description: "Advice for farmers in Myanmar Unicode" },
            reasoning: { type: Type.STRING, description: "Detailed reason in Myanmar Unicode" },
            globalConfidence: { type: Type.NUMBER },
            cropUpdates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "The ID from the list (1, 2, 3, or 4)" },
                  currentPrice: { type: Type.STRING },
                  change: { type: Type.STRING },
                  trend: { type: Type.STRING, enum: ['up', 'down', 'stable'] },
                  source: { type: Type.STRING },
                  confidence: { type: Type.NUMBER }
                },
                required: ["id", "currentPrice", "change", "trend", "source", "confidence"]
              }
            }
          },
          required: ["advice", "reasoning", "globalConfidence", "cropUpdates"]
        }
      },
    });

    const result = JSON.parse(response.text || "{}");
    
    // Extract sources from grounding metadata
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => ({
      title: chunk.web?.title || "Market Source",
      uri: chunk.web?.uri || "#"
    })) || [];

    const analysis: MarketAnalysis = {
      ...result,
      sources
    };

    cachedAnalysis = analysis;
    lastFetchTime = now;
    return analysis;
  } catch (error: any) {
    console.error("Error fetching market insight:", error);
    // If we have a cache even if expired, return it on error to avoid broken UI
    if (cachedAnalysis) return cachedAnalysis;
    return null;
  }
};

/**
 * Fetch specific live prices for selected crops.
 */
export const fetchLivePrices = async (cropNames: string[]): Promise<LivePrice[] | null> => {
  if (cropNames.length === 0) return [];
  
  try {
    const ai = getAI();
    const prompt = `Provide the current market prices for: ${cropNames.join(", ")} in Myanmar Kyats for Feb 2026.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              price: { type: Type.STRING },
              change: { type: Type.STRING },
              trend: { type: Type.STRING, enum: ['up', 'down', 'stable'] },
              unit: { type: Type.STRING }
            },
            required: ["name", "price", "change", "trend", "unit"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error fetching live prices:", error);
    return null;
  }
};
