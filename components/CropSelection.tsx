import React, { useState } from 'react';
import { Search, ChevronLeft, Bean, Droplet, Wheat, Carrot, CheckCircle2 } from 'lucide-react';
import { ALL_CROPS, CATEGORIES, REGIONS } from '../constants';

interface CropSelectionProps {
  onConfirm: (selectedIds: string[]) => void;
  onBack: () => void;
  initialSelectedIds: string[];
}

const CropSelection: React.FC<CropSelectionProps> = ({ onConfirm, onBack, initialSelectedIds }) => {
  // အသုံးပြုသူ၏ တောင်းဆိုချက်အရ ရွေးချယ်မှုစတင်ချိန်တွင် Array အလွတ်တစ်ခုအဖြစ်သာ ထားရှိပါသည်
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('taunggyi');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCrop = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredCrops = ALL_CROPS.filter(crop => 
    crop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bean': return <Bean size={20} />;
      case 'Droplet': return <Droplet size={20} />;
      case 'Wheat': return <Wheat size={20} />;
      case 'Carrot': return <Carrot size={20} />;
      default: return <Bean size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-relaxed">စိုက်ပျိုးသီးနှံ ရွေးချယ်ပါ</h1>
            <p className="text-xs text-slate-500 font-medium">မိမိ စျေးနှုန်းသိလိုသော သီးနှံများကို ရွေးချယ်ပါ။</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="သီးနှံအမည်ဖြင့် ရှာဖွေပါ..."
            className="w-full bg-white text-slate-900 placeholder:text-slate-500 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Regional Quick Select */}
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
          {REGIONS.map(region => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                selectedRegion === region.id 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100' 
                : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* Popular Crops Grid */}
        <div className="mt-4">
          <h3 className="text-sm font-bold text-slate-800 mb-4 opacity-70 uppercase tracking-wider">သီးနှံများ</h3>
          <div className="grid grid-cols-2 gap-3">
            {filteredCrops.map(crop => {
              const isSelected = selectedIds.includes(crop.id);
              return (
                <div 
                  key={crop.id}
                  onClick={() => toggleCrop(crop.id)}
                  className={`relative p-4 rounded-[2rem] border transition-all cursor-pointer overflow-hidden group active:scale-95 ${
                    isSelected 
                    ? 'bg-emerald-50 border-emerald-500 shadow-md' 
                    : 'bg-white border-slate-100 shadow-sm'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-emerald-600 animate-in zoom-in duration-200">
                      <CheckCircle2 size={18} fill="currentColor" className="text-white" />
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
                    isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {getCategoryIcon(crop.categoryId === 'pulses' ? 'Bean' : crop.categoryId === 'oilseeds' ? 'Droplet' : crop.categoryId === 'cereals' ? 'Wheat' : 'Carrot')}
                  </div>
                  
                  <h4 className={`text-sm font-bold leading-relaxed mb-1 transition-colors ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                    {crop.name}
                  </h4>
                  
                  <button className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isSelected ? 'ရွေးချယ်ပြီး' : 'ရွေးချယ်မည်'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 p-4 z-50 pb-8 rounded-t-[2.5rem] shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <p className="text-xs font-bold text-slate-400 mb-3">
            သီးနှံ <span className="text-emerald-600 text-lg mx-1">{selectedIds.length}</span> မျိုး ရွေးချယ်ထားသည်။
          </p>
          <button 
            disabled={selectedIds.length === 0}
            onClick={() => onConfirm(selectedIds)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:shadow-none text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            ရှေ့ဆက်မည်
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropSelection;