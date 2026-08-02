import React from 'react';
import { ServiceCategory } from '../types';
import { X, CheckCircle2, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';
import { getWhatsAppLink, WHATSAPP_BUTTON_TEXT } from '../constants/whatsapp';

interface DetailModalProps {
  service: ServiceCategory | null;
  onClose: () => void;
  onOpenInquiry: (inquiryType?: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ service, onClose, onOpenInquiry }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full text-white shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-64 w-full shrink-0">
          <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-950/80 text-slate-300 hover:text-white p-2 rounded-full border border-slate-700 backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded-md mb-2 inline-block">
              카테고리 {service.code}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">{service.title}</h3>
            <p className="text-xs text-amber-300 font-medium">{service.subtitle}</p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <p className="text-slate-300 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 tracking-wider uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>주요 지원 및 제공 항목</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-950/60 border border-blue-900 rounded-2xl p-4 text-xs text-slate-300">
            <strong>B2B 현지 운영 가이드:</strong> 단체의 구체적인 세부 일정과 특이 요구사항은 사전 1:1 상담을 통해 맞춤 조정 및 현지 수배 검토가 진행됩니다.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors"
          >
            닫기
          </button>
          <a
            href={getWhatsAppLink(`안녕하세요. Everyday Holidays 홈페이지에서 [${service.title}] 맞춤 수배 상담 문의드립니다.`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-xs px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950 text-slate-950 shrink-0" />
            <span>{WHATSAPP_BUTTON_TEXT}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
