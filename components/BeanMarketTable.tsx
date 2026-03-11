
import React from 'react';
import { ALL_CROPS } from '../constants';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const BeanMarketTable: React.FC = () => {
  const beanCrops = ALL_CROPS.filter(crop => crop.categoryId === 'pulses');

  return (
    <section className="px-4 mt-10">
      <div className="flex flex-col mb-6 px-1">
        <h2 className="text-xl font-black text-slate-900 leading-none">ပဲမျိုးစုံ စျေးကွက်</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ယနေ့ပေါက်စျေး အနှစ်ချုပ်</p>
      </div>

      <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">သီးနှံအမည်</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">စျေးနှုန်း</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">အပြောင်းအလဲ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {beanCrops.map((crop) => (
              <tr key={crop.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800">{crop.name}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{crop.unit}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="text-sm font-black text-slate-900">{crop.price}</span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className={`flex items-center justify-end gap-1 text-[10px] font-black ${
                    crop.trend === 'up' ? 'text-emerald-600' : 
                    crop.trend === 'down' ? 'text-red-500' : 'text-slate-400'
                  }`}>
                    {crop.trend === 'up' ? <TrendingUp size={10} /> : 
                     crop.trend === 'down' ? <TrendingDown size={10} /> : <Minus size={10} />}
                    <span>{crop.change}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 px-1">
         <p className="text-[9px] font-bold text-slate-400 leading-relaxed italic">
           * ဤစျေးနှုန်းများသည် ဘုရင့်နောင်ကုန်စည်ဒိုင်၏ ယနေ့နံနက်ပိုင်း ပေါက်စျေးများဖြစ်ပါသည်။
         </p>
      </div>
    </section>
  );
};

export default BeanMarketTable;
