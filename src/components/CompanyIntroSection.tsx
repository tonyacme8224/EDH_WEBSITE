import React from 'react';
import { Shield, CheckCircle2, Building, Globe, Users, ArrowRight, MessageSquare } from 'lucide-react';
import { EverydayHolidaysLogo } from './Logo';
import { getWhatsAppLink, WHATSAPP_BUTTON_TEXT } from '../constants/whatsapp';

interface CompanyIntroSectionProps {
  onOpenInquiry: () => void;
}

export const CompanyIntroSection: React.FC<CompanyIntroSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section id="about-section" className="py-24 bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
      
      {/* Decorative Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-50/60 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm font-bold tracking-wide">
            <Globe className="w-4 h-4 text-blue-700" />
            <span>싱가포르 전문 현지 B2B 랜드사</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            싱가포르 단체여행에 필요한<br className="hidden sm:inline" />
            <span className="text-blue-900 underline decoration-amber-400 decoration-4 underline-offset-8">
              현지 업무를 하나의 창구
            </span>에서 지원합니다
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Everyday Holidays는 일반 패키지 관광상품을 판매하는 여행사가 아니라, 단체의 방문 목적과 참가자 특성에 맞춰 싱가포르 현지 서비스를 설계하고 운영하는 전문 랜드사입니다.
          </p>
        </div>

        {/* Content Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main Statement Box */}
          <div className="lg:col-span-7 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between border border-slate-800">
            <div className="space-y-6 relative z-10">
              <div className="inline-block bg-white/90 p-3 rounded-2xl shadow-md border border-slate-200/20 mb-2">
                <EverydayHolidaysLogo />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                한국 여행사, 학교, 대학, 공공기관 및 기업을 위한
                <span className="text-amber-400 block mt-1">싱가포르 현지 전담 운영 파트너</span>
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                한국 여행사, 학교, 대학, 공공기관, 기업 및 협회와 협력하여 여행 일정 구성부터 호텔, 식사, 차량, 가이드, 방문기관 및 현지 행사 운영까지 필요한 업무를 맞춤형으로 지원합니다.
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                단체의 목적, 일정, 인원, 예산을 먼저 분석하고 실현 가능성과 이동 동선을 고려한 안정적인 현지 운영안을 제안합니다.
              </p>
            </div>

            <div className="pt-8 border-t border-slate-800/80 mt-8 flex flex-wrap items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-amber-400" />
                <span className="text-xs sm:text-sm text-slate-300 font-semibold">소비자 대상 판매 없음 · 100% B2B 전용 현지 운영</span>
              </div>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950 stroke-slate-950" />
                <span>{WHATSAPP_BUTTON_TEXT}</span>
              </a>
            </div>
          </div>

          {/* Core Strengths Right Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 hover:border-blue-400 transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 font-bold text-lg">
                  01
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">단일 창구 통합 수배 (One-Stop)</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    호텔, 버스, 한국어 가이드, 특식, 방문기관 접수를 파편화 없이 단 하나의 창구에서 신속하게 전담 관리합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 hover:border-blue-400 transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 font-bold text-lg">
                  02
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">실현 가능한 동선 & 안전 설계</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    싱가포르 현지 도로 사정과 피로도를 엄밀히 고려하여 무리 없는 최적의 탐방 및 연수 동선을 수립합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 hover:border-blue-400 transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 font-bold text-lg">
                  03
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">24시간 현장 상황 대응</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    창이공항 영접부터 행사 종료까지 전문 상주 인력이 밀착 케어하며, 돌발 변수 발생 시 즉각 대안을 가동합니다.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
