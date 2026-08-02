import React, { useState } from 'react';
import { Send, Upload, CheckCircle2, Shield, AlertTriangle, FileText, Lock, Sparkles } from 'lucide-react';

interface ConsultationFormSectionProps {
  initialInquiryType?: string;
  onSuccessSubmitted?: (inquiryId: string) => void;
}

export const ConsultationFormSection: React.FC<ConsultationFormSectionProps> = ({
  initialInquiryType = '',
  onSuccessSubmitted,
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
    preferredProgram: '',
    targetInstitution: '',
    budget: '',
    isBidding: false,
    biddingDeadline: '',
    replyWishDate: '',
    privacyAgreed: false,
    captchaVerified: false,
    'bot-field': '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

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
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [value ? name : name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setFileError('파일 용량은 최대 10MB까지 가능합니다.');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.companyName || !formData.contactName || !formData.phone || !formData.email || !formData.message) {
      setSubmitError('모든 필수 입력 항목(*)을 입력해 주세요.');
      return;
    }

    if (!formData.privacyAgreed) {
      setSubmitError('개인정보 수집 및 이용 동의에 체크해 주세요.');
      return;
    }

    if (!formData.captchaVerified) {
      setSubmitError('보안인증(캡차) 체크박스를 확인해 주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitError('올바른 이메일 주소 형식을 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);

    let netlifyFormSuccess = false;
    let netlifyFunctionSuccess = false;
    let inquiryId = `EH-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // 1. Submit to Netlify Forms (URL Encoded)
      try {
        const netlifyPayload: Record<string, any> = {
          'form-name': 'inquiry',
          companyName: formData.companyName,
          contactName: formData.contactName,
          phone: formData.phone,
          email: formData.email,
          groupType: formData.groupType,
          inquiryType: formData.inquiryType,
          estimatedCount: formData.estimatedCount,
          startDate: formData.startDate,
          duration: formData.duration,
          preferredProgram: formData.preferredProgram,
          targetInstitution: formData.targetInstitution,
          budget: formData.budget,
          isBidding: formData.isBidding ? '예' : '아니오',
          biddingDeadline: formData.biddingDeadline,
          replyWishDate: formData.replyWishDate,
          message: formData.message,
          privacyAgreed: formData.privacyAgreed ? '동의' : '미동의',
          'bot-field': formData['bot-field'] || '',
        };

        const encodedBody = Object.keys(netlifyPayload)
          .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(netlifyPayload[key] ?? ''))
          .join('&');

        const netlifyRes = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodedBody,
        }).catch(() => null);

        if (netlifyRes && (netlifyRes.ok || netlifyRes.status === 200 || netlifyRes.status === 302)) {
          netlifyFormSuccess = true;
        }
      } catch (err) {
        console.warn('Netlify Forms submission warning:', err);
      }

      // 2. Submit to Netlify Function (Database & Resend Emails)
      try {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          data.append(key, String(value));
        });

        if (selectedFile) {
          data.append('attachment', selectedFile);
        }

        let response = await fetch('/.netlify/functions/submit-inquiry', {
          method: 'POST',
          body: data,
        }).catch(() => null);

        if (!response || !response.ok) {
          response = await fetch('/api/inquiries', {
            method: 'POST',
            body: data,
          }).catch(() => null);
        }

        if (response && response.ok) {
          const result = await response.json().catch(() => null);
          if (result && result.success) {
            netlifyFunctionSuccess = true;
            if (result.inquiryId) {
              inquiryId = result.inquiryId;
            }
          }
        }
      } catch (err) {
        console.warn('Netlify Function submission warning:', err);
      }

      if (netlifyFormSuccess || netlifyFunctionSuccess) {
        setSubmittedInquiryId(inquiryId);
        if (onSuccessSubmitted) {
          onSuccessSubmitted(inquiryId);
        }
      } else {
        setSubmitError('상담문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry-section" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>B2B CUSTOM CONSULTATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            싱가포르 현지 일정이 필요하신가요?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            단체의 목적, 인원, 기간 및 요청사항을 보내주시면 현지 운영 가능 여부를 검토하여 맞춤형 일정과 견적을 안내해 드립니다.
          </p>
        </div>

        {submittedInquiryId ? (
          /* Success Screen */
          <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6 animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                상담문의가 정상적으로 접수되었습니다.
              </h3>
              <p className="text-slate-300 text-base leading-relaxed max-w-xl mx-auto">
                담당자가 내용을 검토한 후 입력하신 연락처 또는 이메일로 빠르게 회신드리겠습니다.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-md mx-auto text-left space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-semibold">접수번호:</span>
                <span className="text-amber-400 font-black text-base">{submittedInquiryId}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-semibold">회사/기관명:</span>
                <span className="text-white font-bold">{formData.companyName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-semibold">출발 예정일:</span>
                <span className="text-slate-200">{formData.startDate || '미정'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-semibold">예상 인원:</span>
                <span className="text-slate-200">{formData.estimatedCount ? `${formData.estimatedCount}명` : '미정'}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmittedInquiryId(null);
                  setFormData((prev) => ({ ...prev, message: '' }));
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-xl border border-slate-700 transition-colors text-sm"
              >
                새로운 상담문의 작성하기
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form
            name="inquiry"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8"
          >
            <input type="hidden" name="form-name" value="inquiry" />
            <p hidden style={{ display: 'none' }}>
              <label>
                입력하지 마세요:
                <input
                  name="bot-field"
                  value={formData['bot-field'] || ''}
                  onChange={handleInputChange}
                />
              </label>
            </p>
            
            {/* Mandatory Fields Group */}
            <div>
              <h3 className="text-lg font-bold text-amber-400 border-b border-slate-800 pb-3 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                기본 필수 정보 (*)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    회사명 또는 기관명 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="예: 한국여행사 / 서울대학교 / OO구청"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    담당자명 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="예: 홍길동 팀장"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    연락처 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="010-0000-0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    이메일 주소 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@domain.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    단체 유형 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="groupType"
                    value={formData.groupType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {groupTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    문의 유형 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    예상 인원
                  </label>
                  <input
                    type="text"
                    name="estimatedCount"
                    value={formData.estimatedCount}
                    onChange={handleInputChange}
                    placeholder="예: 35명"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    출발 예정일
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    여행 및 연수 기간
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="예: 3박 5일 / 4박 6일"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    회신 희망일
                  </label>
                  <input
                    type="date"
                    name="replyWishDate"
                    value={formData.replyWishDate}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Optional Fields Group */}
            <div>
              <h3 className="text-lg font-bold text-slate-300 border-b border-slate-800 pb-3 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                선택 사항 (추가 연수 요청 정보)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    희망 프로그램 / 테마
                  </label>
                  <input
                    type="text"
                    name="preferredProgram"
                    value={formData.preferredProgram}
                    onChange={handleInputChange}
                    placeholder="예: 스마트시티 견학, 영어 학교 교류, MICE Gala 만찬"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    방문 희망기관 (선택)
                  </label>
                  <input
                    type="text"
                    name="targetInstitution"
                    value={formData.targetInstitution}
                    onChange={handleInputChange}
                    placeholder="예: NUS, NTU, URA, 기업체"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    예상 예산 (1인당 또는 총액)
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="예: 1인당 150만원 선"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Bidding info */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isBidding"
                      name="isBidding"
                      checked={formData.isBidding}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400 bg-slate-900 border-slate-700"
                    />
                    <label htmlFor="isBidding" className="text-xs font-bold text-slate-200">
                      입찰 / 경쟁 제안건 인가요?
                    </label>
                  </div>

                  {formData.isBidding && (
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-amber-400 mb-1">
                        입찰 마감일
                      </label>
                      <input
                        type="date"
                        name="biddingDeadline"
                        value={formData.biddingDeadline}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                  문의 및 수배 요청 내용 <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="단체의 상세 목적, 항공편 일정, 희망 숙소 등급, 특정 식사 요청사항 등 세부 수배 조건 및 요청 내용을 작성해 주세요."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                />
              </div>

              {/* File Attachment */}
              <div className="mt-6">
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                  첨부파일 (과업지시서, 제안요청서, RFP)
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-3 rounded-xl border border-slate-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>파일 선택</span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.zip,.hwp"
                    />
                  </label>
                  <span className="text-xs text-slate-400">
                    {selectedFile ? `📎 ${selectedFile.name}` : 'PDF, Word, Excel, PPT, ZIP, HWP (최대 10MB)'}
                  </span>
                </div>
                {fileError && <p className="text-xs text-rose-400 mt-1">{fileError}</p>}
              </div>
            </div>

            {/* Spam Protection & Privacy Check */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              
              {/* Privacy agreement */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacyAgreed"
                  name="privacyAgreed"
                  checked={formData.privacyAgreed}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-amber-500 rounded focus:ring-amber-400 bg-slate-900 border-slate-700 mt-0.5"
                />
                <label htmlFor="privacyAgreed" className="text-xs sm:text-sm text-slate-300 leading-relaxed cursor-pointer">
                  [필수] 상담 및 맞춤 견적 생성을 위한 <strong>개인정보 수집 및 이용</strong>(회사명, 담당자명, 연락처, 이메일)에 동의합니다.
                </label>
              </div>

              {/* Turnstile / Captcha Verification Simulation */}
              <div className="flex items-center justify-between bg-slate-900 p-3.5 rounded-xl border border-slate-800 max-w-sm">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="captchaVerified"
                    name="captchaVerified"
                    checked={formData.captchaVerified}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-400 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                  <label htmlFor="captchaVerified" className="text-xs text-slate-200 font-semibold cursor-pointer">
                    스팸 방지 보안 인증 (로봇이 아닙니다)
                  </label>
                </div>
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>

            </div>

            {/* Submit Error Warning */}
            {submitError && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm p-4 rounded-xl flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:opacity-50 text-white font-extrabold text-lg px-12 py-5 rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>상담문의 접수 중...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>상담문의 접수하기</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
