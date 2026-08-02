import React, { useState } from 'react';
import { Mail, MessageSquare, Copy, Check, ExternalLink, Sparkles, ShieldCheck, Building } from 'lucide-react';
import { getWhatsAppLink, WHATSAPP_BUTTON_TEXT, WHATSAPP_DEFAULT_MSG } from '../constants/whatsapp';

interface ConsultationFormSectionProps {
  initialInquiryType?: string;
  onSuccessSubmitted?: (inquiryId: string) => void;
}

export const ConsultationFormSection: React.FC<ConsultationFormSectionProps> = ({
  initialInquiryType = '',
}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    groupType: '여행사',
    inquiryType: initialInquiryType || '맞춤 일정 및 견적',
    estimatedCount: '',
    startDate: '',
    duration: '',
    message: '',
  });

  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('everyday.holidays.sg@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const groupTypes = [
    '여행사',
    '초등학교',
    '중학교',
    '고등학교',
    '대학교',
    '공공기관',
    '기업',
    '협회 및 일반단체',
    '기타',
  ];

  const inquiryTypes = [
    '학생단체·수학여행',
    'MICE·기업행사',
    '기관·대학 연수',
    '기업·기관 방문',
    '현지 차량 및 가이드',
    '호텔 및 식사',
    '맞춤 일정 및 견적',
    '기타',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format form entries into WhatsApp text and open WhatsApp Web / App
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let textLines = [
      '안녕하세요. Everyday Holidays 홈페이지를 보고 문의드립니다.',
      '',
      '[문의 상세 내용]',
    ];

    if (formData.companyName) textLines.push(`• 소속/기관명: ${formData.companyName}`);
    if (formData.contactName) textLines.push(`• 담당자명: ${formData.contactName}`);
    if (formData.phone) textLines.push(`• 연락처: ${formData.phone}`);
    if (formData.email) textLines.push(`• 이메일: ${formData.email}`);
    if (formData.groupType) textLines.push(`• 단체 유형: ${formData.groupType}`);
    if (formData.inquiryType) textLines.push(`• 문의 구분: ${formData.inquiryType}`);
    if (formData.estimatedCount) textLines.push(`• 예상 인원: ${formData.estimatedCount}`);
    if (formData.startDate) textLines.push(`• 희망 일정: ${formData.startDate} (${formData.duration || '일정 미정'})`);
    if (formData.message) {
      textLines.push('');
      textLines.push('• 문의 메시지:');
      textLines.push(formData.message);
    }

    const finalMessage = textLines.join('\n');
    const whatsappUrl = getWhatsAppLink(finalMessage);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="inquiry-section" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-emerald-300 text-xs sm:text-sm font-extrabold tracking-wider uppercase backdrop-blur-md">
            <MessageSquare className="w-4 h-4 fill-[#25D366] stroke-[#25D366]" />
            <span>1:1 WhatsApp 실시간 직접 상담</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            맞춤 일정 및 수배 상담 문의
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Everyday Holidays 담당자와 WhatsApp 또는 이메일로 빠르고 명확하게 상담하실 수 있습니다.
          </p>
        </div>

        {/* Primary Direct Contact Box Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-[#25D366]/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            
            {/* WhatsApp Card */}
            <div className="bg-slate-950/90 border-2 border-[#25D366] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#25D366]">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-wider">RECOMMENDED • FASTEST</span>
                </div>
                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                  <MessageSquare className="w-7 h-7 fill-[#25D366] text-slate-950 shrink-0" />
                  <span>WhatsApp 1:1 상담</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  모바일에서는 WhatsApp 앱으로, PC에서는 WhatsApp Web으로 즉시 연결되어 담당자와 1:1로 실시간 견적 및 일정을 상담받으실 수 있습니다.
                </p>
              </div>

              <div>
                <a
                  href={getWhatsAppLink(WHATSAPP_DEFAULT_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-base sm:text-lg shadow-xl shadow-[#25D366]/20 transition-all transform hover:-translate-y-1 active:translate-y-0"
                >
                  <MessageSquare className="w-6 h-6 fill-slate-950 text-slate-950 shrink-0" />
                  <span>{WHATSAPP_BUTTON_TEXT}</span>
                  <ExternalLink className="w-5 h-5 ml-auto opacity-80" />
                </a>
              </div>
            </div>

            {/* Direct Email & Phone Card */}
            <div className="bg-slate-950/90 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <Mail className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-wider">OFFICIAL CONTACTS</span>
                </div>
                <h3 className="text-xl font-black text-white">직접 연락처 안내</h3>
                
                <div className="space-y-3 text-xs">
                  {/* Email row */}
                  <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-slate-400 font-medium text-[11px]">대표 이메일</div>
                      <div className="text-white font-bold text-sm truncate">everyday.holidays.sg@gmail.com</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 shrink-0 transition-colors flex items-center gap-1"
                    >
                      {emailCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{emailCopied ? '복사됨' : '복사'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="mailto:everyday.holidays.sg@gmail.com?subject=%5BEveryday%20Holidays%20B2B%20%EB%AC%B8%EC%9D%98%5D%20%EC%8B%B1%EA%B0%80%ED%8F%AC%EB%A5%B4%20%EB%8B%A8%EC%B2%B4%20%EC%83%81%EB%8B%B4%20%EB%B0%8F%20%EA%B2%AC%EC%A0%81%20%EC%9A%94%EC%B2%AD"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  <span>이메일(everyday.holidays.sg@gmail.com) 바로 보내기</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Inquiry Preparation Form -> Generates WhatsApp Message */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="space-y-2 border-b border-slate-800 pb-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-400" />
              <span>상세 단체 일정 사전 작성 후 WhatsApp 전송</span>
            </h3>
            <p className="text-xs text-slate-400">
              아래 항목을 미리 작성하신 후 하단의 <strong>[WhatsApp으로 상담하기]</strong> 버튼을 누르시면, 입력하신 내용이 자동으로 정리되어 WhatsApp 메시지로 바로 전달됩니다.
            </p>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  소속 / 회사 / 기관명
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="예: OO여행사 / OO초등학교 / OO기업"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#25D366] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  담당자 성함
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="예: 홍길동 팀장"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#25D366] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  연락처 (전화번호)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#25D366] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  이메일 주소
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#25D366] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  단체 구분
                </label>
                <select
                  name="groupType"
                  value={formData.groupType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#25D366] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                >
                  {groupTypes.map((gt) => (
                    <option key={gt} value={gt}>{gt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  문의 항목
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#25D366] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                >
                  {inquiryTypes.map((it) => (
                    <option key={it} value={it}>{it}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  예상 참가 인원
                </label>
                <input
                  type="text"
                  name="estimatedCount"
                  value={formData.estimatedCount}
                  onChange={handleInputChange}
                  placeholder="예: 30명 내외"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#25D366] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  희망 일정 / 기간
                </label>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  placeholder="예: 2026년 10월 중 (3박 5일)"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#25D366] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                상세 문의 및 수배 요청사항
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="방문 희망 기관, 호텔 등급, 식사 요청사항, 가이드 필요 여부 등 원하시는 수배 내용을 자유롭게 작성해 주세요."
                className="w-full bg-slate-950 border border-slate-700 focus:border-[#25D366] rounded-xl p-4 text-sm text-white placeholder-slate-500 outline-none transition-colors resize-none"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                <span>작성된 내용은 WhatsApp 채팅창으로 직접 연결되며 별도로 데이터가 저장되지 않습니다.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black px-8 py-4 rounded-xl shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-2.5 text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950" />
                <span>{WHATSAPP_BUTTON_TEXT}</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
