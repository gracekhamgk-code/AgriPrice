
import React from 'react';
import { Lightbulb, RefreshCw, Sparkles, ExternalLink, ShieldCheck, Info } from 'lucide-react';
import { MarketAnalysis } from '../services/geminiService';

interface AIInsightProps {
  analysis: MarketAnalysis | null;
  loading: boolean;
  onRefresh: () => void;
}

const AIInsight: React.FC<AIInsightProps> = ({ analysis, loading, onRefresh }) => {
  return (
    <div className="mx-4 mt-6">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-7 rounded-[2.5rem] relative overflow-hidden shadow-xl shadow-emerald-200/50 group">
        {/* Decorative Background */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded-2xl shadow-lg">
                <Lightbulb className="text-emerald-600" size={22} />
              </div>
              <h3 className="font-black text-white text-xs uppercase tracking-widest flex items-center gap-1.5">
                AI ဈေးကွက်ခန့်မှန်းချက် <Sparkles size={12} className="text-emerald-300" />
              </h3>
            </div>
            <button 
              onClick={onRefresh}
              disabled={loading}
              className={`text-white/80 hover:text-white transition-all bg-white/10 p-2 rounded-xl backdrop-blur-md ${loading ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={18} />
            </button>
          </div>
          
          <div className="bg-white/15 backdrop-blur-md p-6 rounded-3xl border border-white/20 mb-4 shadow-inner">
            {loading ? (
              <div className="py-6 flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-emerald-100 text-sm font-bold tracking-wide">၂၀၂၆ ဖေဖော်ဝါရီ ဈေးကွက်ကို ရှာဖွေနေပါသည်...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="bg-white text-emerald-800 text-[10px] font-black px-3 py-1 rounded-full uppercase">ဖေဖော်ဝါရီ ၂၀၂၆</span>
                </div>
                <p className="text-white leading-relaxed font-black text-2xl myanmar-text text-center mb-3">
                  {analysis?.advice || "ဈေးတက်ရန် အလားအလာရှိသောကြောင့် ခေတ္တစောင့်ရန် အကြံပြုပါသည်"}
                </p>
                <div className="h-px bg-white/10 w-1/2 mx-auto mb-3"></div>
                <p className="text-emerald-100/90 text-sm font-bold text-center leading-relaxed px-2">
                  {analysis?.reasoning || "အိန္ဒိယဝယ်လိုအားနှင့် ပြည်တွင်းအဝင်ပေါ်မူတည်၍ ခန့်မှန်းထားပါသည်။"}
                </p>
              </>
            )}
          </div>
          
          <div className="flex flex-wrap justify-between items-center gap-3 px-1">
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-white/10 shadow-sm">
              <ShieldCheck size={16} className="text-emerald-300" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-white font-black">ခန့်မှန်းချက်ယုံကြည်မှု</span>
                <span className="text-[14px] text-emerald-300 font-black">{analysis?.globalConfidence || 85}%</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {analysis?.sources && analysis.sources.length > 0 ? (
                analysis.sources.map((source, idx) => (
                  <a 
                    key={idx}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={source.title}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all border border-white/10 group/btn"
                  >
                    <ExternalLink size={16} className="group-hover/btn:scale-110" />
                  </a>
                ))
              ) : (
                <div className="flex items-center gap-2 text-[10px] text-white/50 font-bold">
                  <Info size={12} />
                  စစ်မှန်သောသတင်းများကို ရှာဖွေထားသည်
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsight;
