import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/contentData';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, GraduationCap, Building2, Landmark, Compass } from 'lucide-react';
import { PageView } from '../types';

interface HeroSliderProps {
  onNavigate: (view: PageView) => void;
  onOpenInquiry: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate, onOpenInquiry }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section 
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] bg-slate-950 text-white flex flex-col justify-between overflow-hidden pt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel Slider */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Zoom Animation */}
            <div 
              className={`absolute inset-0 bg-cover bg-center ${isActive ? 'animate-hero-zoom' : ''}`}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
            {/* Dark Gradient Overlay for Maximum Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />

            {/* Slide Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-12 pb-24 z-20">
              <div className="max-w-3xl space-y-6 animate-fadeIn">
                
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/40 text-amber-300 text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{slide.badge}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight whitespace-pre-line drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Sub Description */}
                <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed whitespace-pre-line drop-shadow-sm max-w-2xl">
                  {slide.description}
                </p>

                {/* Additional B2B Direct DMC Note */}
                <div className="bg-slate-900/90 border-l-4 border-amber-400 p-4 rounded-r-xl backdrop-blur-sm shadow-xl max-w-2xl border border-slate-700/50">
                  <p className="text-xs sm:text-sm text-slate-300 leading-snug">
                    <strong className="text-amber-400 font-bold">Everyday Holidays</strong>는 한국 여행사와 학교, 대학, 기관 및 기업을 대상으로
                    숙박, 식사, 차량, 가이드, 방문기관, 행사 운영을 통합 지원하는 <span className="text-white font-semibold">싱가포르 전문 현지 랜드사</span>입니다.
                  </p>
                </div>

                {/* Call To Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onOpenInquiry}
                    className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-red-600/30 transition-all duration-300 flex items-center gap-3 border border-red-400/30 transform hover:-translate-y-1"
                  >
                    <span>맞춤 일정 문의</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => onNavigate('about')}
                    className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-base sm:text-lg px-7 py-4 rounded-xl border border-slate-600/60 backdrop-blur-md transition-all duration-300 flex items-center gap-2 hover:border-amber-400"
                  >
                    <span>회사소개 & 서비스 보기</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        );
      })}

      {/* Manual Arrow Navigators */}
      <div className="absolute right-6 bottom-28 z-30 hidden md:flex items-center space-x-3">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-slate-900/80 border border-slate-700 text-white flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 transition-all shadow-xl backdrop-blur-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-slate-900/80 border border-slate-700 text-white flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 transition-all shadow-xl backdrop-blur-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Progress Bar & Indicators */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
          <div className="flex items-center space-x-3">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-10 h-3 bg-amber-400 rounded-full'
                    : 'w-3 h-3 bg-slate-700 hover:bg-slate-500 rounded-full'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
            <span className="text-xs text-slate-400 font-mono ml-2">
              0{currentSlide + 1} / 0{HERO_SLIDES.length}
            </span>
          </div>

          <div className="text-xs text-slate-400 hidden sm:block">
            <span className="text-amber-400 font-semibold">100% B2B 현지 랜드사</span> | 싱가포르 전역 맞춤 네트워크
          </div>
        </div>
      </div>

      {/* Floating 4 Core Service Quick Dock Over Hero Bottom */}
      <div className="relative z-30 bg-slate-900/95 border-t border-slate-800 shadow-2xl py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div 
            onClick={() => onNavigate('student')} 
            className="group cursor-pointer bg-slate-800/60 hover:bg-blue-900/40 p-4 rounded-xl border border-slate-700/60 hover:border-amber-400/80 transition-all duration-300 flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-lg bg-blue-600/20 text-amber-400 flex items-center justify-center shrink-0 border border-blue-500/30 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">학생단체·수학여행</h4>
              <p className="text-xs text-slate-400">초·중·고 & 대학 연수</p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('mice')} 
            className="group cursor-pointer bg-slate-800/60 hover:bg-blue-900/40 p-4 rounded-xl border border-slate-700/60 hover:border-amber-400/80 transition-all duration-300 flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">MICE·기업단체</h4>
              <p className="text-xs text-slate-400">인센티브 & 컨퍼런스</p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('institution')} 
            className="group cursor-pointer bg-slate-800/60 hover:bg-blue-900/40 p-4 rounded-xl border border-slate-700/60 hover:border-amber-400/80 transition-all duration-300 flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30 group-hover:scale-110 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">기관·대학 선진지 견학</h4>
              <p className="text-xs text-slate-400">스마트시티 & 벤치마킹</p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('services')} 
            className="group cursor-pointer bg-slate-800/60 hover:bg-blue-900/40 p-4 rounded-xl border border-slate-700/60 hover:border-amber-400/80 transition-all duration-300 flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">맞춤 일정 및 현지 운영</h4>
              <p className="text-xs text-slate-400">1:1 원스톱 수배 지원</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
