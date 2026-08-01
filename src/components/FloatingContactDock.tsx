import React, { useState, useEffect } from 'react';
import { Mail, Phone, ArrowRight, X, MessageSquareQuote } from 'lucide-react';

interface FloatingContactDockProps {
  onOpenInquiry: () => void;
}

export const FloatingContactDock: React.FC<FloatingContactDockProps> = ({ onOpenInquiry }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-md animate-fadeIn">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 shadow-2xl text-white relative flex items-center justify-between gap-4">
        
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 bg-slate-800 text-slate-400 hover:text-white w-6 h-6 rounded-full flex items-center justify-center border border-slate-700 text-xs shadow"
          aria-label="Close float dock"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">싱가포르 B2B 맞춤 수배</h4>
            <p className="text-xs text-slate-300 font-medium">실시간 일정 및 견적 검토</p>
          </div>
        </div>

        <button
          onClick={onOpenInquiry}
          className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-1.5 whitespace-nowrap transition-transform hover:scale-105"
        >
          <span>맞춤 문의</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
