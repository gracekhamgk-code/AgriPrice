
import React from 'react';

interface GaugeMeterProps {
  value: number; // 0 to 100
  label: string;
}

const GaugeMeter: React.FC<GaugeMeterProps> = ({ value, label }) => {
  const rotation = (value / 100) * 180 - 90;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-16 overflow-hidden">
        {/* Background Arc */}
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-[10px] border-slate-100"></div>
        {/* Colored Arc Segments */}
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-[10px] border-emerald-500 clip-path-half rotate-[135deg]"></div>
        
        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1 h-14 bg-slate-800 origin-bottom -translate-x-1/2 transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800"></div>
        </div>
      </div>
      
      <div className="flex justify-between w-32 mt-1 px-1">
        <span className="text-[8px] font-bold text-emerald-600">စောင့်ရန်</span>
        <span className="text-[8px] font-bold text-red-600">ရောင်းရန်</span>
      </div>
      
      <p className="text-xs font-black text-slate-900 mt-2">{label}</p>
      <p className="text-[9px] font-bold text-slate-400 mt-0.5">ယုံကြည်မှုအဆင့်: ၈၅%</p>
    </div>
  );
};

export default GaugeMeter;
