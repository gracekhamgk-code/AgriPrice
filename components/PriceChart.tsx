
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MOCK_CHART_DATA } from '../constants';
import GaugeMeter from './GaugeMeter';

const PriceChart: React.FC = () => {
  return (
    <div className="mx-4 mt-8 mb-4 flex flex-col gap-6">
      <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-emerald-100 transition-all">
        <div className="flex-1">
          <h2 className="text-sm font-black text-slate-900 mb-1 leading-relaxed">စျေးကွက်ခန့်မှန်းချက်</h2>
          <p className="text-[11px] text-slate-400 font-bold leading-relaxed">လက်ရှိပေါက်စျေးနှင့် စျေးကွက်အခြေအနေအရ <br/> AI ၏ တွက်ချက်မှု</p>
        </div>
        <GaugeMeter value={35} label="ခဏစောင့်ပါ" />
      </div>

      <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-100 transition-all">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-sm font-black text-slate-900 leading-relaxed uppercase tracking-wide">စျေးနှုန်းပြောင်းလဲမှုမှတ်တမ်း</h2>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full font-black border border-emerald-100">ပဲစင်းငုံ (နီ)</span>
        </div>
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_CHART_DATA}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 800 }}
                dy={12}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '20px', 
                  border: 'none', 
                  boxShadow: '0 10px 25px rgba(16, 185, 129, 0.1)', 
                  fontSize: '12px',
                  fontWeight: 'bold',
                  padding: '12px'
                }}
                labelStyle={{ color: '#065f46', marginBottom: '4px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#10b981" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
