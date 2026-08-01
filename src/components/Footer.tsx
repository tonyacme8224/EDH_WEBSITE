import React, { useState } from 'react';
import { PageView } from '../types';
import { Shield, Mail, MapPin, Phone, Building, ArrowUp } from 'lucide-react';
import { EverydayHolidaysLogo } from './Logo';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <EverydayHolidaysLogo lightText={true} />
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Everyday Holidays는 한국 여행사와 학교, 대학, 공공기관 및 기업을 대상으로 싱가포르 현지 단체 행사, MICE, 학생 수학여행 및 기관 선진지 견학을 전문 운영하는 B2B 현지 랜드사입니다.
            </p>

            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>소비자 대상 판매 없음 · 100% B2B 현지 수배 전담 파트너</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">주요 업무 영역</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onNavigate('student')} className="hover:text-amber-400 transition-colors">
                  학생단체 · 수학여행 수배
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mice')} className="hover:text-amber-400 transition-colors">
                  MICE · 기업 행사 & 포상관광
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('institution')} className="hover:text-amber-400 transition-colors">
                  기관 · 대학 선진지 견학
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">
                  1:1 맞춤 일정 & 현지 전담 수배
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inquiry')} className="hover:text-amber-400 transition-colors font-bold text-amber-300">
                  온라인 상담문의 및 견적 신청
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Placeholders */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">현지 법인 및 사업자 정보</h4>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300 leading-relaxed">
              <div><strong className="text-slate-400">회사/법인명:</strong> Everyday Holidays Pte. Ltd. (상세 법인명 관리자 설정 가능)</div>
              <div><strong className="text-slate-400">현지 사업자 등록번호:</strong> [Singapore UEN - 관리자 설정 가능]</div>
              <div><strong className="text-slate-400">관광 라이선스 번호:</strong> [STB Travel Agent License No. - 관리자 설정 가능]</div>
              <div><strong className="text-slate-400">대표 이메일:</strong> acme8224@gmail.com</div>
              <div><strong className="text-slate-400">싱가포르 현지 주소:</strong> Singapore Business District (상세 주소 설정 가능)</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} Everyday Holidays. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <button onClick={() => setModalType('privacy')} className="hover:text-white transition-colors">
              개인정보처리방침
            </button>
            <span>|</span>
            <button onClick={() => setModalType('terms')} className="hover:text-white transition-colors">
              이용약관
            </button>
            <span>|</span>
            <button onClick={() => onNavigate('admin')} className="hover:text-amber-400 transition-colors">
              관리자 로그인
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center border border-slate-800 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Terms/Privacy Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-white space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">
              {modalType === 'privacy' ? '개인정보처리방침' : '이용약관'}
            </h3>
            <div className="text-xs text-slate-300 leading-relaxed max-h-60 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              {modalType === 'privacy' ? (
                <p>
                  Everyday Holidays는 B2B 상담문의 접수 및 맞춤 견적 생성을 목적으로 회사명, 담당자명, 연락처, 이메일 주소를 수집합니다. 수집된 정보는 고객 상담 목적으로만 사용되며, 관련 법령에 따라 안전하게 보관됩니다.
                </p>
              ) : (
                <p>
                  본 사이트는 B2B 맞춤 여행 및 MICE 프로그램 수배 상담을 위한 안내용 홈페이지입니다. 제출된 견적 수배 요청은 현지 기관 및 수배처 사정에 따라 조정될 수 있습니다.
                </p>
              )}
            </div>
            <div className="text-right">
              <button
                onClick={() => setModalType(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded-lg"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
