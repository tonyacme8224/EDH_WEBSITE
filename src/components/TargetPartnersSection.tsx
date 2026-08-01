import React from 'react';
import { TARGET_PARTNERS } from '../data/contentData';
import { Plane, GraduationCap, School, Building, Landmark, Briefcase, Globe, Award, ShieldCheck } from 'lucide-react';

export const TargetPartnersSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-6 h-6 text-blue-900" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-blue-900" />;
      case 'School':
        return <School className="w-6 h-6 text-blue-900" />;
      case 'Building':
        return <Building className="w-6 h-6 text-blue-900" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-blue-900" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-blue-900" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-blue-900" />;
      case 'Award':
        return <Award className="w-6 h-6 text-blue-900" />;
      default:
        return <Building className="w-6 h-6 text-blue-900" />;
    }
  };

  return (
    <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs sm:text-sm font-bold text-blue-900 tracking-wider uppercase bg-blue-100/60 px-4 py-1.5 rounded-full border border-blue-200">
            TARGET B2B PARTNERS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            이런 단체와 협력합니다
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Everyday Holidays는 개별 관광객보다 <strong className="text-blue-900 font-bold">한국 여행사와 학교, 기관, 대학 및 기업의 단체행사</strong>를 중심으로 전문 협력합니다.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TARGET_PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                {getIcon(partner.icon)}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  {partner.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {partner.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Notice Box */}
        <div className="bg-blue-950 text-white rounded-2xl p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-xl border border-blue-900 flex items-center justify-center gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
          <p className="text-sm sm:text-base text-slate-200 font-semibold">
            Everyday Holidays는 B2B 전용 현지 운영 랜드사로, 한국 파트너사의 신뢰와 사업 보호를 최우선으로 보장합니다.
          </p>
        </div>

      </div>
    </section>
  );
};
