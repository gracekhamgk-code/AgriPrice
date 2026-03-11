
import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

const HeroDecision: React.FC<{ confidence?: number, advice?: string }> = ({ confidence = 85, advice }) => {
  // 0-100 to rotation: -90 to 90
  const rotation = (confidence / 100) * 180 - 90;

  return (
    <div className="mx-4 mt-6">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-100">
                <Sparkles size={16} className="text-white" />
              </div>
              <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">AI စျေးကွက်ခန့်မှန်းချက်</h2>
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <ShieldCheck size={12} className="text-emerald-600" />
              <span className="text-[10px] font-black text-emerald-700">{confidence}% ယုံကြည်မှု</span>
            </div>
          </div>

          <div className="flex flex-col items-center py-4">
            {/* Speedometer Gauge */}
            <div className="relative w-64 h-32 overflow-hidden mb-6">
              {/* Main Arc */}
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[18px] border-slate-100"></div>
              
              {/* Colored Segments */}
              {/* Red - Sell */}
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[18px] border-red-500" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 50%)', opacity: 0.8 }}></div>
              {/* Yellow - Hold */}
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[18px] border-amber-400" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)', opacity: 0.8 }}></div>
              {/* Green - Wait */}
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[18px] border-emerald-500" style={{ clipPath: 'polygon(100% 0, 100% 50%, 50% 50%)', opacity: 0.8 }}></div>

              {/* Needle */}
              <div 
                className="absolute bottom-0 left-1/2 w-1.5 h-24 bg-slate-900 origin-bottom -translate-x-1/2 transition-transform duration-1500 ease-out z-20"
                style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-4 border-white z-30"></div>
            </div>

            <div className="flex justify-between w-full px-2 text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-4">
              <span className="text-red-500">ရောင်းပါ (Sell)</span>
              <span className="text-amber-500">စောင့်ကြည့် (Hold)</span>
              <span className="text-emerald-600">စောင့်ပါ (Wait)</span>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">
                {advice || "၈၅% ဈေးတက်ရန် အလားအလာရှိသည်။"}
              </h3>
              <p className="text-sm text-slate-500 font-bold leading-relaxed px-4">
                အိန္ဒိယဝယ်လိုအား မြင့်တက်နေသောကြောင့် ခေတ္တစောင့်ဆိုင်းရန် အကြံပြုပါသည်။
              </p>
            </div>
          </div>

          <button className="w-full mt-6 bg-slate-50 hover:bg-emerald-50 py-4 rounded-2xl flex items-center justify-center gap-2 border border-slate-100 group transition-all active:scale-95">
            <span className="text-xs font-black text-emerald-800 uppercase tracking-widest">အသေးစိတ်ဖတ်ရှုရန်</span>
            <ArrowRight size={14} className="text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroDecision;
