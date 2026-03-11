
import React from 'react';
import { TrendingUp, TrendingDown, Minus, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { CropPrice } from '../types';

interface ExtendedCropPrice extends CropPrice {
  sourceInfo?: string;
  confidence?: number;
  reason?: string;
}

interface CropCardProps {
  crop: ExtendedCropPrice;
  onClick?: () => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, onClick }) => {
  const isUp = crop.trend === 'up' && crop.change !== '၀' && crop.change !== '0';
  const isStable = crop.change === '၀' || crop.change === '0';
  
  const sourceName = crop.sourceInfo || "ဘုရင့်နောင်";
  const dateStr = "ဖေဖော်ဝါရီ ၂၀၂၆";

  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all cursor-pointer flex flex-col justify-between active:scale-[0.96] min-h-[220px] group relative"
    >
      {crop.confidence && (
        <div className="absolute top-3 right-3 z-10 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-1 shadow-sm flex items-center gap-1">
          <ShieldCheck size={10} className="text-emerald-500" />
          <span className="text-[8px] font-black text-emerald-700">{crop.confidence}%</span>
        </div>
      )}

      <div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm transition-transform group-hover:scale-110 mb-4 ${
          isUp ? 'bg-emerald-50 text-emerald-600' : isStable ? 'bg-slate-50 text-slate-600' : 'bg-red-50 text-red-600'
        }`}>
          {crop.name.charAt(0)}
        </div>
        
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="font-black text-slate-900 text-[13px] leading-tight group-hover:text-emerald-700 transition-colors">{crop.name}</h3>
          <div className={`flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.5 rounded-md ${
            isUp ? 'bg-emerald-100 text-emerald-700' : isStable ? 'bg-slate-100 text-slate-500' : 'bg-red-100 text-red-700'
          }`}>
            {isUp ? <TrendingUp size={10} /> : isStable ? <Minus size={10} /> : <TrendingDown size={10} />}
            <span>{isStable ? 'ဈေးငြိမ်' : crop.change}</span>
          </div>
        </div>
        
        <p className="text-2xl font-black text-slate-900 tracking-tighter">
          {crop.price}
          <span className="text-[10px] font-bold text-slate-400 ml-1.5">ကျပ်</span>
        </p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{crop.unit}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-50">
        <button 
          className="flex items-center gap-1.5 text-[10px] font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors w-fit"
          onClick={(e) => {
            e.stopPropagation();
            alert(`အကြောင်းပြချက်: ${crop.reason || "အိန္ဒိယဝယ်လိုအား မြင့်တက်နေသည်။"}`);
          }}
        >
          <HelpCircle size={12} />
          ဘာကြောင့်လဲ?
        </button>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[7px] font-black text-slate-400 uppercase truncate max-w-[60%]">{sourceName}</span>
          <div className="flex items-center gap-1 text-[7px] font-black text-slate-300">
            <Clock size={8} />
            <span>ယခု</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
