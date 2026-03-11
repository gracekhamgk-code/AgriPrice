
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroDecision from './components/HeroDecision';
import CropCard from './components/CropCard';
import PriceChart from './components/PriceChart';
import BottomNav from './components/BottomNav';
import PriceAlertModal from './components/PriceAlertModal';
import CropDetail from './components/CropDetail';
import CropSelection from './components/CropSelection';
import CommunityGauge from './components/CommunityGauge';
import MarketPage from './components/MarketPage';
import VoiceChatOverlay from './components/VoiceChatOverlay';
import BeanMarketTable from './components/BeanMarketTable';
import { ALL_CROPS } from './constants';
import { NavigationTab, CropPrice } from './types';
import { BellRing, LayoutGrid, RefreshCcw, Mic, AlertCircle } from 'lucide-react';
import { getMarketInsight, MarketAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.Home);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<(CropPrice & { sourceInfo?: string; confidence?: number }) | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [userSelectedCropIds, setUserSelectedCropIds] = useState<string[]>([]);
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null);
  const [isLoadingMarket, setIsLoadingMarket] = useState(false);
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    setIsLoadingMarket(true);
    setError(null);
    try {
      const analysis = await getMarketInsight();
      if (analysis) {
        setMarketAnalysis(analysis);
      } else {
        setError("စျေးကွက်အချက်အလက်များ ရယူ၍မရပါ။ ခေတ္တစောင့်ပြီး ပြန်လည်ကြိုးစားပါ။");
      }
    } catch (err) {
      setError("ချိတ်ဆက်မှု အခက်အခဲရှိနေပါသည်။");
    } finally {
      setIsLoadingMarket(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  const handleBack = () => setSelectedCrop(null);

  const homeCrops = ALL_CROPS.filter(c => userSelectedCropIds.includes(c.id)).map(crop => {
    const update = marketAnalysis?.cropUpdates.find(u => u.id === crop.id);
    if (update) {
      return {
        ...crop,
        price: update.currentPrice,
        change: update.change,
        trend: update.trend,
        sourceInfo: update.source,
        confidence: update.confidence
      };
    }
    return crop;
  });

  if (isSelectionMode) {
    return (
      <CropSelection 
        initialSelectedIds={userSelectedCropIds}
        onConfirm={(ids) => {
          setUserSelectedCropIds(ids);
          setIsSelectionMode(false);
        }}
        onBack={() => setIsSelectionMode(false)}
      />
    );
  }

  if (selectedCrop) {
    const cropWithUpdate = homeCrops.find(c => c.id === selectedCrop.id) || selectedCrop;
    return <CropDetail crop={cropWithUpdate} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen pb-48 max-w-md mx-auto bg-slate-50 shadow-2xl relative overflow-x-hidden border-x border-slate-100">
      <Header />
      
      <main className="animate-in fade-in slide-in-from-bottom-6 duration-700">
        {activeTab === NavigationTab.Home && (
          <>
            {error && (
              <div className="mx-4 mt-4 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in zoom-in duration-300">
                <AlertCircle size={20} />
                <p className="text-xs font-bold myanmar-text">{error}</p>
                <button onClick={fetchMarketData} className="ml-auto bg-white px-3 py-1 rounded-lg shadow-sm text-[10px] font-black uppercase">ပြန်တင်ရန်</button>
              </div>
            )}

            <HeroDecision 
              confidence={marketAnalysis?.globalConfidence} 
              advice={marketAnalysis?.advice} 
            />
            
            <CommunityGauge />
            
            <BeanMarketTable />
            
            <section className="px-4 mt-10">
              <div className="flex justify-between items-end mb-6 px-1">
                <div className="flex flex-col">
                   <div className="flex items-center gap-2">
                     <h2 className="text-2xl font-black text-slate-900 leading-none">သီးနှံစျေးကွက်</h2>
                     {isLoadingMarket && <RefreshCcw size={16} className="animate-spin text-emerald-500" />}
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ယနေ့ပေါက်စျေးများ</p>
                </div>
                <button 
                  onClick={() => setIsSelectionMode(true)}
                  className="text-emerald-700 text-[10px] font-black flex items-center gap-1.5 bg-white border border-slate-100 px-4 py-2.5 rounded-2xl hover:bg-emerald-50 transition-all active:scale-95 shadow-sm"
                >
                  <LayoutGrid size={12} />
                  သီးနှံရွေးရန်
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {homeCrops.length > 0 ? (
                  homeCrops.map((crop) => (
                    <CropCard 
                      key={crop.id} 
                      crop={crop} 
                      onClick={() => setSelectedCrop(crop)} 
                    />
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 shadow-sm">
                    <p className="text-slate-400 text-sm mb-5 font-bold">သီးနှံများ မရွေးချယ်ရသေးပါ။</p>
                    <button 
                      onClick={() => setIsSelectionMode(true)}
                      className="bg-emerald-600 text-white px-8 py-3 rounded-2xl text-sm font-black shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                    >
                      သီးနှံရွေးရန်
                    </button>
                  </div>
                )}
              </div>
            </section>

            <PriceChart />

            <div className="px-4 mt-10">
              <button 
                onClick={() => setIsAlertModalOpen(true)}
                className="w-full bg-slate-900 hover:bg-black text-white font-black py-7 rounded-[2rem] flex items-center justify-center gap-4 shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] border border-slate-800"
              >
                <BellRing size={22} className="text-emerald-400" />
                <span className="leading-relaxed">စျေးနှုန်းသတိပေးချက်သတ်မှတ်မည်</span>
              </button>
            </div>
          </>
        )}

        {activeTab === NavigationTab.Market && (
          <MarketPage />
        )}

        {(activeTab === NavigationTab.News || activeTab === NavigationTab.Profile) && (
          <div className="flex flex-col items-center justify-center h-[60vh] px-8 text-center animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-emerald-200 mb-8 shadow-sm border border-slate-100">
               <LayoutGrid size={40} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-3 leading-tight">တည်ဆောက်ဆဲ...</h3>
            <p className="text-slate-400 font-bold leading-relaxed px-4">ဤစာမျက်နှာကို မကြာမီ လွှင့်တင်ပေးပါမည်။ <br/> ခေတ္တစောင့်ဆိုင်းပေးပါ။</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-28 left-0 right-0 flex justify-center z-[60] pointer-events-none">
        <button 
          onClick={() => setIsVoiceChatOpen(true)}
          className="voice-pulse pointer-events-auto bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-full shadow-[0_15px_30px_-5px_rgba(5,150,105,0.4)] transition-all active:scale-90 group flex items-center gap-3 pr-8 pl-6"
        >
          <Mic size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-black whitespace-nowrap">စကားပြော၍ မေးမြန်းပါ</span>
        </button>
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <PriceAlertModal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} />
      <VoiceChatOverlay 
        isOpen={isVoiceChatOpen} 
        onClose={() => setIsVoiceChatOpen(false)} 
        marketData={marketAnalysis}
      />
    </div>
  );
};

export default App;
