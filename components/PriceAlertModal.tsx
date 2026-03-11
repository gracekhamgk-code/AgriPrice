
import React, { useState } from 'react';
import { BellRing, X } from 'lucide-react';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PriceAlertModal: React.FC<PriceAlertModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="relative bg-white w-full max-w-[320px] rounded-[2.5rem] p-6 shadow-2xl border border-slate-100">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors border border-slate-100 shadow-sm"
          aria-label="Close"
        >
          <X size={18} className="text-slate-500" />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
            <BellRing size={28} />
          </div>
          <h2 className="text-lg font-black text-slate-900 leading-tight mb-2">စျေးနှုန်းသတိပေးချက်</h2>
          <p className="text-[10px] font-bold text-slate-400 mb-6 px-4 uppercase tracking-wider">စျေးနှုန်းပြောင်းလဲလျှင် အသိပေးပါမည်</p>
          
          <div className="w-full space-y-4 mb-6">
            <div className="text-left">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">သီးနှံရွေးချယ်ရန်</label>
              <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-bold text-slate-700">
                <option>မတ်ပဲ</option>
                <option>ပဲစင်းငုံ</option>
                <option>နှမ်းဖြူ</option>
                <option>ပြောင်းဖူး</option>
              </select>
            </div>
            <div className="text-left">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">သတ်မှတ်စျေးနှုန်း (ကျပ်)</label>
              <input type="number" placeholder="၃၃၀,၀၀၀" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-bold text-slate-700" />
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full py-3.5 bg-emerald-600 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
          >
            သတိပေးချက်သတ်မှတ်မည်
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceAlertModal;
