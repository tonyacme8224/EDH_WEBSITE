import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppLink, WHATSAPP_BUTTON_TEXT } from '../constants/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-sm sm:text-base px-5 py-3.5 rounded-full shadow-2xl border-2 border-white flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 shadow-[#25D366]/40 cursor-pointer"
        aria-label={WHATSAPP_BUTTON_TEXT}
      >
        <MessageSquare className="w-6 h-6 fill-slate-950 stroke-slate-950 shrink-0" />
        <span className="tracking-tight font-extrabold whitespace-nowrap">{WHATSAPP_BUTTON_TEXT}</span>
      </a>
    </div>
  );
};
