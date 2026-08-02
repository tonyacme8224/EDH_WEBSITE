import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Mail, MessageSquare, Menu, X, Shield, ArrowRight, Building } from 'lucide-react';
import { EverydayHolidaysLogo } from './Logo';
import { getWhatsAppLink, WHATSAPP_BUTTON_TEXT } from '../constants/whatsapp';

interface HeaderProps {
  activeView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageView; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: '회사소개' },
    { id: 'student', label: '학생단체·수학여행' },
    { id: 'mice', label: 'MICE·단체행사' },
    { id: 'institution', label: '기관·대학 연수' },
    { id: 'services', label: '맞춤 운영 서비스' },
    { id: 'inquiry', label: '상담문의' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-amber-400 font-semibold gap-1">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              100% B2B 현지 랜드사 (한국 여행사 · 학교 · 기관 · 기업 전용 파트너)
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Singapore Group Travel & MICE Specialist</span>
          </div>
          <div className="flex items-center space-x-5 text-slate-300">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-extrabold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
              <span>{WHATSAPP_BUTTON_TEXT}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a href="mailto:everyday.holidays.sg@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              everyday.holidays.sg@gmail.com
            </a>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1 hover:text-amber-400 text-slate-400 font-medium transition-colors"
            >
              <Building className="w-3.5 h-3.5" />
              관리자 접속
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl py-3 border-b border-slate-800' 
          : 'bg-gradient-to-b from-slate-950/90 via-slate-900/70 to-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <EverydayHolidaysLogo lightText={true} />
            <span className="bg-red-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase shrink-0">
              B2B
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                    isActive 
                      ? 'text-amber-400 bg-slate-800/80 shadow-sm' 
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>



          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden bg-[#25D366] text-slate-950 text-xs font-black px-3 py-1.5 rounded-md flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 mb-3 text-xs text-slate-300 flex items-center justify-between">
              <span className="font-semibold text-amber-400">싱가포르 B2B 전문 랜드사</span>
              <span className="text-emerald-400 font-bold">1:1 WhatsApp 실시간 상담</span>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                  activeView === item.id 
                    ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-400' 
                    : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {activeView === item.id && <span className="text-amber-400 text-xs">선택됨</span>}
              </button>
            ))}
            <div className="pt-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-center font-black py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 fill-slate-950" />
                <span>{WHATSAPP_BUTTON_TEXT}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
