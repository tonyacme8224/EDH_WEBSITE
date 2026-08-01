import React from 'react';
import { SINGAPORE_HUBS } from '../data/contentData';
import { AlertCircle, MapPin, Building, GraduationCap, Sparkles } from 'lucide-react';

export const SingaporeFocusGallery: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SINGAPORE INFRASTRUCTURE & HUBS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            싱가포르 주요 탐방 및 연수 인프라
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            세계 수준의 MICE 컨벤션 센터부터 스마트시티 기술 시설 및 명문 대학까지, 단체 목적에 맞춘 최적의 연수 환경을 제안합니다.
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SINGAPORE_HUBS.map((hub, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-amber-400/60 transition-all duration-300 shadow-xl group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={hub.image} 
                  alt={hub.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-slate-950/80 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-700 backdrop-blur-md">
                  {hub.category}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {hub.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {hub.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Official Notice Box */}
        <div className="bg-amber-500/10 border-l-4 border-amber-400 rounded-r-2xl p-5 border border-amber-500/20 backdrop-blur-md max-w-4xl mx-auto flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-300">기관 및 기업 방문 안내 사항</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              기관 및 기업 방문은 방문 목적, 참가자 구성, 희망 일정 및 해당 기관의 사정에 따라 가능 여부와 승인 절차가 달라질 수 있습니다. 사전 상담 시 희망하시는 방문처를 알려주시면 실현 가능성을 먼저 철저히 검토해 드립니다.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
