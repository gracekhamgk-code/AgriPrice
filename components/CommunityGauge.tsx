
import React from 'react';
import { Users } from 'lucide-react';

const CommunityGauge: React.FC = () => {
  return (
    <div className="mx-4 mt-8">
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-emerald-600" />
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">ကျွန်ုပ်တို့အသိုက်အဝန်း လက်ကျန်ပမာဏ</h3>
          </div>
          <span className="text-[10px] font-black text-emerald-700">၇၅% စုစည်းပြီး</span>
        </div>
        
        <div className="relative h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full shadow-inner transition-all duration-1000 ease-out"
            style={{ width: '75%' }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
            တောင်သူပေါင်း (၅,၀၀၀) ကျော်မှ <br/> စုပေါင်းအင်အားဖြင့် စျေးနှုန်းညှိနှိုင်းနိုင်ရန်
          </p>
          <div className="text-right">
            <span className="text-xs font-black text-slate-900 block">၄.၂ သန်း (တန်)</span>
            <span className="text-[8px] text-slate-400 font-bold uppercase">စုစုပေါင်း</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityGauge;
