import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, X } from 'lucide-react';
import { getWhatsAppLink, WHATSAPP_BUTTON_TEXT } from '../constants/whatsapp';

interface FloatingContactDockProps {
  onOpenInquiry: () => void;
}

export const FloatingContactDock: React.FC<FloatingContactDockProps> = ({ onOpenInquiry }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-sm sm:max-w-md animate-fadeIn">
      <div className="bg-slate-900/95 backdrop-blur-md border-2 border-[#25D366]/80 rounded-2xl p-3.5 sm:p-4 shadow-2xl text-white relative flex items-center justify-between gap-3">
        
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2.5 -right-2.5 bg-slate-800 text-slate-300 hover:text-white w-6 h-6 rounded-full flex items-center justify-center border border-slate-700 text-xs shadow z-10"
          aria-label="Close float dock"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 border border-[#25D366]/40">
            <MessageSquare className="w-5 h-5 fill-[#25D366] text-slate-900" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-black text-emerald-300 tracking-tight truncate">싱가포르 B2B 1:1 수배 상담</h4>
            <p className="text-[11px] text-slate-300 font-medium truncate">WhatsApp 실시간 직접 상담</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-xs px-3.5 py-2.5 rounded-xl shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
            title={WHATSAPP_BUTTON_TEXT}
          >
            <MessageSquare className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span className="whitespace-nowrap">{WHATSAPP_BUTTON_TEXT}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
