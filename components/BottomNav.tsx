
import React from 'react';
import { Home, BarChart2, Newspaper, User } from 'lucide-react';
import { NavigationTab } from '../types';

interface BottomNavProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: NavigationTab.Home, icon: Home, label: 'ပင်မစာမျက်နှာ' },
    { id: NavigationTab.Market, icon: BarChart2, label: 'စျေးကွက်' },
    { id: NavigationTab.News, icon: Newspaper, label: 'သတင်း' },
    { id: NavigationTab.Profile, icon: User, label: 'အကောင့်' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-100 px-8 pt-4 pb-10 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-[0_-15px_35px_rgba(0,0,0,0.08)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'text-emerald-700 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-emerald-50 text-emerald-700' : ''}`}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[9px] font-black transition-all duration-300 uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-60'}`}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
