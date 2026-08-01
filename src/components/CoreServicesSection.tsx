import React from 'react';
import { CORE_SERVICES } from '../data/contentData';
import { CheckCircle2, ArrowRight, GraduationCap, Building2, Landmark } from 'lucide-react';
import { PageView, ServiceCategory } from '../types';

interface CoreServicesSectionProps {
  onSelectService: (service: ServiceCategory) => void;
  onOpenInquiry: (inquiryType?: string) => void;
  onNavigate: (view: PageView) => void;
}

export const CoreServicesSection: React.FC<CoreServicesSectionProps> = ({
  onSelectService,
  onOpenInquiry,
  onNavigate,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'student':
        return <GraduationCap className="w-7 h-7 text-amber-400" />;
      case 'mice':
        return <Building2 className="w-7 h-7 text-amber-400" />;
      case 'institution':
        return <Landmark className="w-7 h-7 text-amber-400" />;
      default:
        return <GraduationCap className="w-7 h-7 text-amber-400" />;
    }
  };

  const getViewForService = (id: string): PageView => {
    if (id === 'student') return 'student';
    if (id === 'mice') return 'mice';
    if (id === 'institution') return 'institution';
    return 'services';
  };

  return (
    <section id="core-services" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs sm:text-sm font-bold text-amber-400 tracking-widest uppercase bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20">
            CORE B2B SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            맞춤형 싱가포르 현지 전문 서비스
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
            Everyday Holidays는 학생단체, MICE 기업 행사, 기관·대학 선진지 견학의 3대 핵심 분야에서 최고 수준의 현지 운영을 제공합니다.
          </p>
        </div>

        {/* 3 Large Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {CORE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-slate-950 rounded-3xl border border-slate-800 hover:border-amber-400/80 transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Header Image Box */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Category Code Badge */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 text-amber-400 font-black text-sm px-3 py-1 rounded-lg border border-slate-700 backdrop-blur-md">
                    카테고리 {service.code}
                  </div>

                  {/* Icon Box */}
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-900/90 border border-blue-400/30 flex items-center justify-center backdrop-blur-md shadow-lg">
                      {getIcon(service.id)}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">{service.title}</h3>
                      <p className="text-xs text-amber-300/90 font-medium">{service.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 space-y-6">
                  <p className="text-slate-300 text-sm leading-relaxed border-b border-slate-800/80 pb-4">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">주요 제공 항목</h4>
                    <ul className="space-y-2.5">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="p-6 bg-slate-900/80 border-t border-slate-800/80 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate(getViewForService(service.id))}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold py-3 px-3 rounded-xl border border-slate-700 transition-colors text-center"
                >
                  자세히 보기
                </button>
                <button
                  onClick={() => onOpenInquiry(service.title)}
                  className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs sm:text-sm font-extrabold py-3 px-3 rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>맞춤 일정 문의</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
