
import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Info, CloudSun, MapPin, BellRing, ChevronRight, Clock, ShieldCheck, Newspaper } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CropPrice } from '../types';
import { MOCK_CHART_DATA, REGIONAL_PRICES } from '../constants';

interface CropDetailProps {
  crop: CropPrice & { sourceInfo?: string; confidence?: number };
  onBack: () => void;
}

const CropDetail: React.FC<CropDetailProps> = ({ crop, onBack }) => {
  const [timeRange, setTimeRange] = useState('၃၀ ရက်');

  return (
    <div className="animate-in slide-in-from-right duration-300 bg-slate-50 min-h-screen">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-slate-100">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-black text-slate-900 leading-tight truncate">
            {crop.name}
          </h1>
          <span className="text-[10px] font-bold text-slate-400">အသေးစိတ်ခွဲခြမ်းစိတ်ဖြာချက်</span>
        </div>
      </nav>

      {/* Hero Stats */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
          <p className="text-slate-500 text-xs mb-2 font-bold uppercase tracking-wider">လက်ရှိပေါက်စျေး ({crop.unit})</p>
          <h2 className="text-4xl font-black text-slate-900 mb-2">
            {crop.price} <span className="text-xl font-medium text-slate-400">ကျပ်</span>
          </h2>
          <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold bg-emerald-50 w-fit mx-auto px-5 py-2 rounded-full text-xs mb-4 shadow-sm">
            <TrendingUp size={14} />
            <span>ပြောင်းလဲမှု: {crop.change} ကျပ်</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[10px] text-slate-400 font-bold border-t border-slate-50 pt-4">
             <div className="flex items-center gap-2">
               <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-600">{crop.sourceInfo || "ဘုရင့်နောင် ကုန်စည်ဒိုင်"}</span>
               <span className="flex items-center gap-1"><Clock size={10} /> ယခုလေးတင်</span>
             </div>
             <span className="text-emerald-600/50 mt-1">ဖေဖော်ဝါရီ ၂၀၂၆ ပေါက်ဈေး</span>
          </div>
        </div>
      </div>

      {/* Recommendation Engine (Decision Box) */}
      <div className="px-4 pb-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-7 text-white relative overflow-hidden shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-bold opacity-80 uppercase tracking-widest text-[10px]">AI စျေးကွက်ခန့်မှန်းချက်</h3>
            <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-[12px] font-black text-emerald-300">{crop.confidence || 85}% ယုံကြည်မှု</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            {/* Custom Meter */}
            <div className="w-full flex justify-between px-2 mb-2">
              <span className="text-[10px] font-black text-emerald-400 uppercase">Hold (သိမ်းရန်)</span>
              <span className="text-[10px] font-black text-red-400 uppercase">Sell (ရောင်းရန်)</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-8 border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-1000"
                style={{ width: `${100 - (crop.confidence || 85)}%` }}
              ></div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 w-full border border-white/10 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                  <Newspaper size={18} className="text-emerald-400" />
                </div>
                <span className="text-emerald-400 font-black text-sm uppercase tracking-wide">Market Insight</span>
              </div>
              <p className="text-sm font-bold leading-relaxed text-slate-100">
                အိန္ဒိယဝယ်လိုအားနှင့် ဖေဖော်ဝါရီလ သီးနှံပေါ်ဦးပေါ်ဖျား အခြေအနေကို တွက်ချက်ထားပါသည်။ ဈေးနှုန်းမြင့်တက်ရန် အလားအလာရှိသောကြောင့် ခေတ္တစောင့်ဆိုင်းရန် အကြံပြုပါသည်။
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Price History Chart */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-slate-800 leading-relaxed uppercase tracking-wide text-sm">စျေးနှုန်းပြောင်းလဲမှုမှတ်တမ်း</h3>
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
              {['၇ ရက်', '၃၀ ရက်'].map(range => (
                <button 
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`text-[10px] px-4 py-2 rounded-lg font-black transition-all ${timeRange === range ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorDetail" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontWeight: 'bold' }} 
                />
                <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorDetail)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="px-4 pb-6">
        <h3 className="font-black text-slate-800 leading-relaxed mb-4 uppercase tracking-wider text-xs px-1 opacity-50">စျေးကွက်အခြေအနေ (Sentiment)</h3>
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100 space-y-7">
          <SentimentRow label="ဝယ်လိုအား (Demand)" value="၈၅%" status="⬆️ မြင့်မား" color="bg-emerald-500" />
          <SentimentRow label="ရောင်းလိုအား (Supply)" value="၄၀%" status="⬇️ နည်းပါး" color="bg-amber-500" />
          <SentimentRow icon={<CloudSun size={14} />} label="ရာသီဥတုအခြေအနေ" value="၉၀%" status="☀️ ကောင်းမွန်" color="bg-blue-500" />
        </div>
      </div>

      {/* Regional Prices */}
      <div className="px-4 pb-40">
        <h3 className="font-black text-slate-800 leading-relaxed mb-4 uppercase tracking-wider text-xs px-1 opacity-50">မြို့အလိုက် စျေးနှုန်းနှိုင်းယှဉ်ချက်</h3>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                <th className="px-6 py-4 text-left font-black text-[10px] uppercase tracking-widest">မြို့</th>
                <th className="px-6 py-4 text-right font-black text-[10px] uppercase tracking-widest">စျေးနှုန်း</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {REGIONAL_PRICES.map((region) => (
                <tr key={region.city} className="group hover:bg-emerald-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-emerald-500 transition-all">
                        <MapPin size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{region.city}</span>
                        {region.isHighest && (
                          <span className="text-[8px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-black w-fit mt-0.5">အမြင့်ဆုံး</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="font-black text-slate-900 text-base">{region.price}</span>
                    <span className="text-[10px] text-slate-400 ml-1 font-bold uppercase">ကျပ်</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-12 z-50">
        <button className="w-full bg-slate-900 hover:bg-black text-white font-black py-6 rounded-3xl flex items-center justify-center gap-4 shadow-2xl transition-all active:scale-[0.98] border border-slate-800">
          <BellRing size={20} className="text-emerald-400" />
          <span className="leading-relaxed">စျေးနှုန်း အပြောင်းအလဲရှိလျှင် အကြောင်းကြားစာ ပို့မည်</span>
        </button>
      </div>
    </div>
  );
};

interface SentimentRowProps {
  label: string;
  value: string;
  status: string;
  color: string;
  icon?: React.ReactNode;
}

const SentimentRow: React.FC<SentimentRowProps> = ({ label, value, status, color, icon }) => (
  <div>
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <div className="p-1 bg-slate-50 rounded-lg text-slate-400">
          {icon || <Info size={14} />}
        </div>
        <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{label}</span>
      </div>
      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{status}</span>
    </div>
    <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
      <div className={`h-full ${color} shadow-lg shadow-emerald-500/20`} style={{ width: value }}></div>
    </div>
  </div>
);

export default CropDetail;
