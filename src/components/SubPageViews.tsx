import React from 'react';
import { PageView } from '../types';
import { CORE_SERVICES, CUSTOM_SERVICES, PRINCIPLES, TARGET_PARTNERS } from '../data/contentData';
import { GraduationCap, Building2, Landmark, CheckCircle2, ArrowRight, Compass, ShieldCheck, Hotel, Users, MapPin, MessageSquare } from 'lucide-react';
import { getWhatsAppLink, WHATSAPP_BUTTON_TEXT } from '../constants/whatsapp';

interface SubPageProps {
  onOpenInquiry: (inquiryType?: string) => void;
  onNavigate: (view: PageView) => void;
}

export const AboutView: React.FC<SubPageProps> = ({ onOpenInquiry, onNavigate }) => {
  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen space-y-20">
      
      {/* Banner */}
      <div className="relative h-72 sm:h-96 bg-cover bg-center flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-4">
          <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase">ABOUT EVERYDAY HOLIDAYS</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">회사소개</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            한국 여행사와 기관, 대학교, 기업을 위한 싱가포르 현지 전문 B2B 랜드사
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Philosophy */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
            Everyday Holidays는 일반 관광상품을 판매하는 여행사가 아닌,<br className="hidden sm:inline" />
            <span className="text-amber-400">맞춤형 B2B 현지 운영 랜드사</span>입니다.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            한국 여행사, 학교, 대학, 공공기관, 기업 및 협회와 협력하여 여행 일정 구성부터 호텔, 식사, 차량, 가이드, 방문기관 및 현지 행사 운영까지 필요한 업무를 맞춤형으로 지원합니다.
          </p>
          <p className="text-slate-300 text-base leading-relaxed">
            단체의 목적, 일정, 인원, 예산을 먼저 분석하고 실현 가능성과 이동 동선을 고려한 안정적인 현지 운영안을 제안합니다.
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="space-y-8">
          <h3 className="text-2xl font-black text-white text-center">Everyday Holidays의 운영 원칙</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((pr) => (
              <div key={pr.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-lg font-bold text-amber-300">{pr.title}</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Partners */}
        <div className="space-y-8">
          <h3 className="text-2xl font-black text-white text-center">협력 대상</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TARGET_PARTNERS.map((tp, idx) => (
              <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-1">{tp.name}</h4>
                <p className="text-xs text-slate-400">{tp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-950 to-slate-900 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-4">싱가포르 현지 파트너십이 필요하신가요?</h3>
          <a
            href={getWhatsAppLink('안녕하세요. Everyday Holidays 홈페이지에서 B2B 파트너십 및 수배 상담 문의드립니다.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-sm px-8 py-4 rounded-xl shadow-xl transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950 text-slate-950 shrink-0" />
            <span>{WHATSAPP_BUTTON_TEXT}</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export const StudentView: React.FC<SubPageProps> = ({ onOpenInquiry }) => {
  const data = CORE_SERVICES.find((s) => s.id === 'student')!;

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen space-y-16">
      <div className="relative h-72 sm:h-96 bg-cover bg-center flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url('${data.imageUrl}')` }}>
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-4">
          <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase">STUDENT EDUCATIONAL TOURS</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">학생단체 · 수학여행</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            초·중·고 수학여행부터 대학생 글로벌 연수까지 안전하고 유익한 탐방 프로그램
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-2xl font-black text-white">교육적 가치와 안전 중심의 수학여행 수배</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            초·중·고등학교와 대학생 단체를 대상으로 교육 목적과 연령에 적합한 싱가포르 체험·탐방 프로그램을 설계합니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.features.map((f, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 font-semibold">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          <a
            href={getWhatsAppLink('안녕하세요. Everyday Holidays 홈페이지에서 학생단체·수학여행 맞춤 수배 상담 문의드립니다.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-base px-10 py-4 rounded-2xl shadow-2xl"
          >
            <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950 shrink-0" />
            <span>{WHATSAPP_BUTTON_TEXT}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const MiceView: React.FC<SubPageProps> = ({ onOpenInquiry }) => {
  const data = CORE_SERVICES.find((s) => s.id === 'mice')!;

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen space-y-16">
      <div className="relative h-72 sm:h-96 bg-cover bg-center flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url('${data.imageUrl}')` }}>
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-4">
          <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase">MICE & CORPORATE EVENTS</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">MICE · 단체행사</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            기업 인센티브, 회의, 연수, 포상관광 원스톱 현지 맞춤 솔루션
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-2xl font-black text-white">기업 및 단체 맞춤 행사 현지 운영</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            기업, 협회, 기관 및 각종 단체를 위한 회의, 포상관광, 연수, 행사 및 맞춤형 현지 프로그램을 지원합니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.features.map((f, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 font-semibold">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          <a
            href={getWhatsAppLink('안녕하세요. Everyday Holidays 홈페이지에서 MICE·기업행사 맞춤 수배 상담 문의드립니다.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-base px-10 py-4 rounded-2xl shadow-2xl"
          >
            <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950 shrink-0" />
            <span>{WHATSAPP_BUTTON_TEXT}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const InstitutionView: React.FC<SubPageProps> = ({ onOpenInquiry }) => {
  const data = CORE_SERVICES.find((s) => s.id === 'institution')!;

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen space-y-16">
      <div className="relative h-72 sm:h-96 bg-cover bg-center flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url('${data.imageUrl}')` }}>
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-4">
          <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase">BENCHMARKING & INSTITUTION TOURS</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">기관 · 대학 연수</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            스마트시티 벤치마킹, 대학 탐방 및 정책 연수 맞춤 일정 설계
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-2xl font-black text-white">공공기관 및 선진 지자체 맞춤 연수</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            공공기관, 지방자치단체, 대학 및 전문단체를 대상으로 방문 목적과 전공, 정책 분야에 맞는 견학 및 연수 프로그램을 구성합니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.features.map((f, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 font-semibold">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-500/10 border-l-4 border-amber-400 p-5 rounded-r-xl border border-amber-500/20 max-w-3xl mx-auto text-xs text-slate-300">
          기관 및 기업 방문은 방문 목적, 참가자 구성, 희망 일정 및 해당 기관의 사정에 따라 가능 여부가 달라질 수 있습니다.
        </div>

        <div className="text-center pt-4">
          <a
            href={getWhatsAppLink('안녕하세요. Everyday Holidays 홈페이지에서 기관·대학 연수 맞춤 수배 상담 문의드립니다.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-base px-10 py-4 rounded-2xl shadow-2xl"
          >
            <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950 shrink-0" />
            <span>{WHATSAPP_BUTTON_TEXT}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const ServicesView: React.FC<SubPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen space-y-16">
      <div className="text-center max-w-3xl mx-auto px-4 space-y-4">
        <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase">TAILOR-MADE SERVICES</span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">맞춤 운영 서비스</h1>
        <p className="text-slate-300 text-base sm:text-lg">
          정해진 패키지 상품이 아니라 단체의 목적에 맞춰 현지 일정을 새롭게 설계합니다.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CUSTOM_SERVICES.map((srv) => (
            <div key={srv.step} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-4">
              <span className="text-amber-400 font-bold text-sm">STEP {srv.step}</span>
              <h3 className="text-2xl font-bold text-white">{srv.title}</h3>
              <p className="text-slate-300 text-sm">{srv.description}</p>
              <ul className="space-y-2 pt-2">
                {srv.items.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <a
            href={getWhatsAppLink('안녕하세요. Everyday Holidays 홈페이지에서 맞춤 운영 서비스 수배 상담 문의드립니다.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-base px-10 py-4 rounded-2xl shadow-2xl"
          >
            <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950 shrink-0" />
            <span>{WHATSAPP_BUTTON_TEXT}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
