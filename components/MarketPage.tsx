import React, { useState } from 'react';
import { MapPin, PhoneCall, CheckCircle, TrendingDown, Minus, Info, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CHART_DATA, REGIONAL_PRICES } from '../constants';

const MARKET_DATA = {
  "markets": [
    {
      "region": "taunggyi",
      "displayName": "တောင်ကြီး",
      "buyers": [
        { "id": "b1", "name": "ရှမ်းရိုးမ ပွဲရုံ", "phone": "095501234", "crops": ["ပြောင်း", "အာလူး"], "verified": true },
        { "id": "b2", "name": "နန်းတော်ဝင်", "phone": "094409988", "crops": ["ကော်ဖီ"], "verified": true }
      ]
    },
    {
      "region": "monywa",
      "displayName": "မုံရွာ",
      "buyers": [
        { "id": "b3", "name": "ဦးအောင် ပွဲရုံ", "phone": "091234567", "crops": ["မတ်ပဲ", "ပဲစင်းငုံ"], "verified": true }
      ]
    }
  ]
};

const MarketPage: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('taunggyi');

  const selectedMarket = MARKET_DATA.markets.find(m => m.region === selectedRegionId);
  const displayBuyers = selectedMarket?.buyers || [];

  return (
    <div className="animate-in fade-in slide-in-from-right duration-500 pb-20 bg-slate-50 min-h-screen">
      {/* Page Title Section */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-black text-slate-900 leading-none">စျေးကွက်အခြေအနေ</h2>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">ယနေ့ ဈေးနှုန်းနှင့် ဒေသအလိုက် ပွဲရုံများ</p>
      </div>

      {/* Regional Price Comparison */}
      <section className="mb-8">
        <div className="flex justify-between items-center px-4 mb-4">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">မြို့နယ်အလိုက် နှိုင်းယှဉ်ချက်</h3>
          <button className="text-[10px] font-bold text-emerald-700">အားလုံးကြည့်ရန်</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-4">
          {REGIONAL_PRICES.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-[2rem] border border-slate-100 min-w-[150px] shadow-sm relative overflow-hidden flex-shrink-0">
              <div className="absolute top-0 right-0 w-12 h-12 bg-slate-50 rounded-full -mr-6 -mt-6 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-2">
                  <p className="text-[10px] font-black text-emerald-700 uppercase">{item.city}</p>
                  <span className="text-[8px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">{item.crop}</span>
                </div>
                
                <p className="text-lg font-black text-slate-900 leading-none mb-1">{item.price}</p>
                
                <div className="flex flex-col gap-1">
                  <div className={`flex items-center gap-0.5 text-[9px] font-bold ${item.trend === 'up' ? 'text-emerald-500' : item.trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
                    {item.trend === 'up' ? <ArrowUpRight size={10}/> : item.trend === 'down' ? <TrendingDown size={10} /> : <Minus size={10}/>}
                    <span>{item.trend === 'up' ? 'စျေးတက်' : item.trend === 'down' ? 'စျေးကျ' : 'စျေးငြိမ်'}</span>
                  </div>
                  {item.status && <p className="text-[8px] font-bold text-slate-400 italic">#{item.status}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Analysis Summary */}
      <section className="px-4 mb-8">
        <div className="bg-white border-l-4 border-emerald-700 rounded-r-[2rem] p-6 shadow-sm shadow-emerald-900/5">
          <div className="flex items-center gap-2 mb-2">
            <Info size={16} className="text-emerald-700" />
            <h3 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">ယနေ့စျေးကွက်သုံးသပ်ချက်</h3>
          </div>
          <p className="text-sm font-black text-slate-900 leading-relaxed myanmar-text">
            စျေးကွက်သုံးသပ်ချက်: ပဲစင်းငုံစျေးသည် အိန္ဒိယဝယ်လိုအားကြောင့် ဆက်လက်မြင့်တက်နိုင်ခြေရှိသဖြင့် ခေတ္တစောင့်ဆိုင်းရန် အကြံပြုပါသည်။
          </p>
        </div>
      </section>

      {/* Regional Filtering for Buyers */}
      <section className="px-4 pb-12">
        <div className="flex justify-between items-center mb-5 px-1">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">ယုံကြည်ရသော ပွဲရုံများ</h3>
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100">
            <MapPin size={10} />
            <span>{selectedMarket?.displayName}</span>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar py-1">
          {MARKET_DATA.markets.map((market) => (
            <button
              key={market.region}
              onClick={() => setSelectedRegionId(market.region)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                selectedRegionId === market.region 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 border-transparent' 
                : 'bg-white text-slate-400 border border-slate-100 hover:border-emerald-100'
              }`}
            >
              {market.displayName}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {displayBuyers.map((buyer) => (
            <div 
              key={buyer.id} 
              className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className="font-black text-slate-900 text-sm leading-tight">{buyer.name}</h4>
                    {buyer.verified && (
                      <CheckCircle size={14} className="text-emerald-500" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {buyer.crops.map((crop, cidx) => (
                      <span key={cidx} className="text-[8px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <a 
                  href={`tel:${buyer.phone}`}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white p-4 rounded-2xl shadow-xl shadow-emerald-100 active:scale-90 transition-all flex items-center justify-center"
                  title="ဖုန်းခေါ်ဆိုရန်"
                >
                  <PhoneCall size={20} />
                </a>
                <span className="text-[8px] font-black text-emerald-700 uppercase">ဖုန်းခေါ်ဆိုရန်</span>
              </div>
            </div>
          ))}
          
          {displayBuyers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-[2rem] border border-dashed border-slate-200">
               <p className="text-slate-400 text-sm font-bold">ဤဒေသအတွက် ပွဲရုံစာရင်း မရှိသေးပါ။</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MarketPage;