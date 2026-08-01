import React from 'react';
import { PROCESS_STEPS } from '../data/contentData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProcessTimelineSectionProps {
  onOpenInquiry: () => void;
}

export const ProcessTimelineSection: React.FC<ProcessTimelineSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section className="py-24 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs sm:text-sm font-bold text-amber-400 tracking-wider uppercase bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20">
            7-STEP OPERATIONAL WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            상담부터 현지 운영까지
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            체계적이고 투명한 7단계 프로세스로 완벽한 싱가포르 현지 일정을 완수합니다.
          </p>
        </div>

        {/* 7-Step Grid Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 mb-16">
          {PROCESS_STEPS.map((stepItem, idx) => (
            <div
              key={stepItem.step}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-amber-400 transition-all duration-300 shadow-lg flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-amber-400 group-hover:scale-110 transition-transform">
                    {stepItem.step}
                  </span>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-600 hidden lg:block" />
                  )}
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {stepItem.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>STEP {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Call Banner */}
        <div className="text-center bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            신속한 수배 검토가 필요하신가요?
          </h3>
          <p className="text-slate-300 text-sm mb-6 max-w-xl mx-auto">
            단체 조건과 희망 일정을 전달해 주시면 24시간 이내에 현지 가능 여부와 세부 가이드를 공유해 드립니다.
          </p>
          <button
            onClick={onOpenInquiry}
            className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-xl transition-all"
          >
            맞춤 일정 및 견적 요청하기
          </button>
        </div>

      </div>
    </section>
  );
};
