import React from 'react';
import { CUSTOM_SERVICES } from '../data/contentData';
import { Compass, Hotel, Building2, ShieldCheck, Check, ArrowRight, Info, MessageSquare } from 'lucide-react';
import { getWhatsAppLink, WHATSAPP_BUTTON_TEXT } from '../constants/whatsapp';

interface CustomOperationSectionProps {
  onOpenInquiry: () => void;
}

export const CustomOperationSection: React.FC<CustomOperationSectionProps> = ({ onOpenInquiry }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-400" />;
      case 'Hotel':
        return <Hotel className="w-6 h-6 text-amber-400" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-400" />;
      default:
        return <Compass className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="custom-services" className="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs sm:text-sm font-bold text-blue-900 tracking-wider uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
            TAILOR-MADE LOCAL SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            단체의 목적에 맞춰<br />
            <span className="text-blue-900">현지 일정을 새롭게 설계</span>합니다
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            정해진 패키지 일정을 판매하지 않습니다. 단체의 방문 목적, 참가자 연령, 인원, 예산, 희망기관 및 항공일정을 검토하여 가장 적합한 싱가포르 프로그램을 구성합니다.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {CUSTOM_SERVICES.map((srv) => (
            <div
              key={srv.step}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-blue-500 transition-all duration-300 shadow-sm flex flex-col justify-between hover:shadow-md"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-950 text-white flex items-center justify-center shadow-md">
                      {getIcon(srv.icon)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-900 tracking-wider uppercase">
                        SERVICE {srv.step}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                        {srv.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Items */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/60">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">세부 영역</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {srv.items.map((item, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Guidance Note Box */}
        <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-base font-bold text-white mb-1">기관 및 기업 방문 안내</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                기관 및 기업 방문은 방문 목적, 참가자 구성, 희망 일정 및 해당 기관의 사정에 따라 가능 여부가 달라질 수 있습니다.
              </p>
            </div>
          </div>
          <a
            href={getWhatsAppLink('안녕하세요. Everyday Holidays 홈페이지에서 1:1 맞춤 수배 상담 문의드립니다.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950 stroke-slate-950 shrink-0" />
            <span>{WHATSAPP_BUTTON_TEXT}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
