import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { AssistantResponse, Intent } from './types/navigation';
import { Building2, Landmark, Store, Info, Map as MapIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [currentStatus, setCurrentStatus] = useState<string | undefined>(undefined);
  const [targetShop, setTargetShop] = useState<string | undefined>(undefined);

  const handleAssistantResponse = (response: AssistantResponse) => {
    setCurrentStatus(response.data.location);
    if (response.intent === Intent.NAVIGATION || response.intent === Intent.MEDICAL) {
      setTargetShop(response.data.target);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-200">
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-slate-900 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Building2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">興東商場助手</h1>
            <p className="text-xs text-slate-400 font-mono">Hing Tung Mall AI • Local Expert</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <Info size={16} />
            <span>商場指南</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <MapIcon size={16} />
            <span>層數平面圖</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto w-full overflow-hidden">
        {/* Info Sidebar */}
        <div className="flex-1 flex flex-col gap-6 order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl"
          >
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Landmark size={14} />
              商場概覽
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase">地理位置</span>
                <span className="text-sm text-slate-300">筲箕灣耀興道55號</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase">樓層分佈</span>
                <div className="flex gap-2 mt-1">
                  {['G/F', '1/F', '2/F'].map(f => (
                    <span key={f} className={`px-2 py-1 rounded text-[10px] font-bold ${currentStatus === f ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  💡 貼士：想搵提款機？地下有東亞，1 樓有 HSBC。攞淘寶快遞要去地下菜鳥驛站啊！
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl"
          >
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Store size={14} />
              當前狀態
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs items-center p-2 bg-slate-800/50 rounded-lg">
                <span className="text-slate-500">當前樓層</span>
                <span className="text-blue-400 font-mono font-bold">{currentStatus || '等待中...'}</span>
              </div>
              <div className="flex justify-between text-xs items-center p-2 bg-slate-800/50 rounded-lg">
                <span className="text-slate-500">導航目標</span>
                <span className="text-orange-400 font-medium">{targetShop || '無'}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chat Section */}
        <div className="flex-[2] h-[600px] order-1 lg:order-2 flex flex-col">
          <ChatInterface onResponse={handleAssistantResponse} />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-[10px] text-slate-600 font-mono tracking-tighter">
        BASED ON LOCAL KNOWLEDGE • HING TUNG DATA VERSION: 2026.05.10
      </footer>
    </div>
  );
}
