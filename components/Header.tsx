
import React from 'react';
import { Bell, Search, Globe, DollarSign } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-emerald-900 leading-none">AgriPrice</h1>
          <p className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-widest mt-1">Myanmar Tracker</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 bg-slate-50 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors">
            <Search size={18} />
          </button>
          <div className="relative">
            <button className="p-2.5 bg-slate-50 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell size={18} />
            </button>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </div>
        </div>
      </div>
      
      {/* Market Ticker */}
      <div className="bg-emerald-700 py-2 px-4 flex gap-6 overflow-x-auto no-scrollbar border-t border-emerald-600">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <DollarSign size={12} className="text-emerald-300" />
          <span className="text-[10px] text-white font-bold">USD/MMK:</span>
          <span className="text-[10px] text-emerald-200 font-black">၄,၈၀၀ ကျပ်</span>
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Globe size={12} className="text-emerald-300" />
          <span className="text-[10px] text-white font-bold">Global Index:</span>
          <span className="text-[10px] text-emerald-400 font-black">+၁.၂%</span>
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[10px] text-white font-bold">ဆီစျေး:</span>
          <span className="text-[10px] text-red-300 font-black">-၀.၅%</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
