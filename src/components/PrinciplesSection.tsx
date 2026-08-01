import React from 'react';
import { PRINCIPLES } from '../data/contentData';
import { Target, MapPin, Users, Layers, MessageSquare, AlertTriangle } from 'lucide-react';

export const PrinciplesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-6 h-6 text-amber-400" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-amber-400" />;
      case 'Users':
        return <Users className="w-6 h-6 text-amber-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-amber-400" />;
      case 'MessageSquareCheck':
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-amber-400" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-6 h-6 text-amber-400" />;
      default:
        return <Target className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs sm:text-sm font-bold text-amber-400 tracking-wider uppercase bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20">
            OPERATIONAL PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            안정적인 단체 운영을 위한<br />
            <span className="text-amber-400">Everyday Holidays의 기본 원칙</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            철저한 사전 준비와 투명한 현지 소통, 현장 대처 능력으로 매끄러운 일정을 보장합니다.
          </p>
        </div>

        {/* 6 Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.id}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-amber-400/70 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(principle.icon)}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {principle.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
