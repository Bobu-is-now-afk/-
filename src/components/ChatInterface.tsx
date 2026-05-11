import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot, Navigation as NavIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AssistantResponse, Intent } from '../types/navigation';
import { processPrompt } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  data?: AssistantResponse;
}

interface ChatInterfaceProps {
  onResponse: (response: AssistantResponse) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onResponse }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是興東商場助手。我可以幫你搵食肆、搵設施（如洗手間）或者帶你行。請問你想去邊層或者邊間舖頭？'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await processPrompt(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.naturalLanguage,
        data: response
      };
      setMessages(prev => [...prev, assistantMessage]);
      onResponse(response);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，發生了點問題。請重試。'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <Bot size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">興東商場智能助手</h2>
          <p className="text-[10px] text-blue-400 font-mono uppercase tracking-tighter">Hing Tung Mall Expert</p>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-slate-700' : 'bg-blue-600'
                }`}>
                  {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.content}
                  {msg.data?.intent === Intent.NAVIGATION && (
                    <div className="mt-2 text-[10px] bg-slate-900/50 p-2 rounded-lg border border-slate-700/50 flex items-center gap-2">
                      <NavIcon size={12} className="text-blue-400" />
                      <span className="text-slate-400">當前導航中: {msg.data.data.target} ({msg.data.data.location})</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800 text-slate-400 p-3 rounded-xl rounded-tl-none flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs">分析空間數據中...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="要去哪裡？或是告訴我你附近的地標..."
            className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
