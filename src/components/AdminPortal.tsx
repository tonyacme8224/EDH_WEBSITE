import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { ShieldAlert, RefreshCw, Mail, Search, CheckCircle2, AlertCircle, FileText, ArrowLeft, Send, Lock, UserCheck } from 'lucide-react';
import { EverydayHolidaysLogo } from './Logo';

interface AdminPortalProps {
  onBackToHome: () => void;
  selectedInquiryId?: string | null;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToHome, selectedInquiryId }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [adminMemoInput, setAdminMemoInput] = useState('');
  const [resendingEmail, setResendingEmail] = useState<'admin' | 'customer' | null>(null);
  const [resendMessage, setResendMessage] = useState('');

  const statusOptions = ['신규', '확인 중', '견적 작성 중', '회신 완료', '협의 중', '계약 확정', '보류', '종료'];

  // Check login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (password === 'admin1234' || password === 'everyday1234' || password === 'acme8224') {
      setIsAuthenticated(true);
      fetchInquiries();
    } else {
      setLoginError('비밀번호가 올바르지 않습니다. (기본: admin1234)');
    }
  };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      let res = await fetch('/.netlify/functions/get-inquiries').catch(() => null);
      if (!res || !res.ok) {
        res = await fetch('/api/inquiries');
      }
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
        if (selectedInquiryId) {
          const match = (data.inquiries || []).find((i: Inquiry) => i.id === selectedInquiryId);
          if (match) setSelectedInquiry(match);
        }
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.map((item) => (item.id === id ? data.inquiry : item)));
        if (selectedInquiry?.id === id) setSelectedInquiry(data.inquiry);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleSaveMemo = async (id: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminMemo: adminMemoInput }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.map((item) => (item.id === id ? data.inquiry : item)));
        if (selectedInquiry?.id === id) setSelectedInquiry(data.inquiry);
        setResendMessage('관리자 메모가 저장되었습니다.');
      }
    } catch (err) {
      console.error('Failed to save memo:', err);
    }
  };

  const handleResendEmail = async (id: string, target: 'admin' | 'customer') => {
    setResendingEmail(target);
    setResendMessage('');
    try {
      const res = await fetch(`/api/inquiries/${id}/resend-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.map((item) => (item.id === id ? data.inquiry : item)));
        if (selectedInquiry?.id === id) setSelectedInquiry(data.inquiry);
        setResendMessage(`${target === 'admin' ? '관리자 메일(acme8224@gmail.com)' : '고객 메일'} 재발송 처리되었습니다.`);
      }
    } catch (err) {
      console.error('Resend email error:', err);
      setResendMessage('이메일 재발송에 실패했습니다.');
    } finally {
      setResendingEmail(null);
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesStatus = statusFilter === 'ALL' || inquiry.status === statusFilter;
    const matchesSearch =
      inquiry.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 pt-24">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <EverydayHolidaysLogo lightText={true} />
            </div>
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black">관리자 로그인</h2>
            <p className="text-xs text-slate-400">Everyday Holidays B2B 상담문의 관리 시스템</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase">
                관리자 비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력 (기본: admin1234)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {loginError && <p className="text-xs text-rose-400 font-semibold">{loginError}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
            >
              로그인
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onBackToHome}
              className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>홈페이지로 돌아가기</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-2">
            <EverydayHolidaysLogo lightText={true} />
            <div className="flex items-center gap-3 pt-1">
              <span className="bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                ADMINISTRATION PORTAL
              </span>
              <span className="text-slate-400 text-xs">수신 메일: acme8224@gmail.com</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white pt-1">
              B2B 상담문의 통합 관리 시스템
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchInquiries}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>새로고침</span>
            </button>
            <button
              onClick={onBackToHome}
              className="bg-blue-900/60 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-blue-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>사이트 메인으로</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-lg">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="회사명, 담당자명, 접수번호 검색..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                statusFilter === 'ALL' ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              전체 ({inquiries.length})
            </button>
            {statusOptions.map((st) => {
              const count = inquiries.filter((i) => i.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    statusFilter === st ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>

        </div>

        {/* Main Content Grid: Table + Detail Modal/Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inquiry Table List */}
          <div className={`${selectedInquiry ? 'lg:col-span-6' : 'lg:col-span-12'} bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl`}>
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-300">
                상담 접수 목록 ({filteredInquiries.length}건)
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-3">접수번호</th>
                    <th className="p-3">회사/기관명</th>
                    <th className="p-3">담당자</th>
                    <th className="p-3">문의유형</th>
                    <th className="p-3">상태</th>
                    <th className="p-3">메일상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        접수된 상담문의 내역이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => {
                          setSelectedInquiry(item);
                          setAdminMemoInput(item.adminMemo || '');
                          setResendMessage('');
                        }}
                        className={`cursor-pointer hover:bg-slate-800/80 transition-colors ${
                          selectedInquiry?.id === item.id ? 'bg-amber-500/10 border-l-4 border-amber-400' : ''
                        }`}
                      >
                        <td className="p-3 font-mono font-bold text-amber-300">{item.id}</td>
                        <td className="p-3 font-bold text-white max-w-[120px] truncate">{item.companyName}</td>
                        <td className="p-3 text-slate-300">{item.contactName}</td>
                        <td className="p-3 text-slate-400">{item.inquiryType}</td>
                        <td className="p-3">
                          <span className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded font-bold border border-slate-700">
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                            item.adminEmailStatus.includes('SENT') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {item.adminEmailStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Inquiry Detail Inspector */}
          {selectedInquiry && (
            <div className="lg:col-span-6 bg-slate-900 rounded-3xl border border-amber-400/50 p-6 space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold">{selectedInquiry.id}</span>
                  <h3 className="text-xl font-black text-white">{selectedInquiry.companyName}</h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-slate-400 hover:text-white text-xs bg-slate-800 px-3 py-1.5 rounded-lg"
                >
                  닫기
                </button>
              </div>

              {/* Status Selector */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-amber-400 uppercase">
                  상담 진행 상태 변경
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value)}
                    className="bg-slate-900 text-white text-xs font-bold border border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
                  >
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <span className="text-xs text-slate-400">
                    접수일시: {new Date(selectedInquiry.createdAt).toLocaleString('ko-KR')}
                  </span>
                </div>
              </div>

              {/* System Execution & Email Status Panel */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-amber-400 border-b border-slate-800 pb-2">시스템 전송 상태</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block">DB 저장:</span>
                    <span className="text-emerald-400 font-bold">성공 (저장됨)</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block">관리자 이메일:</span>
                    <span className="text-amber-300 font-bold">{selectedInquiry.adminEmailStatus}</span>
                  </div>
                </div>

                {/* Resend Buttons */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleResendEmail(selectedInquiry.id, 'admin')}
                    disabled={resendingEmail !== null}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>관리자 이메일 재발송 (acme8224@gmail.com)</span>
                  </button>

                  <button
                    onClick={() => handleResendEmail(selectedInquiry.id, 'customer')}
                    disabled={resendingEmail !== null}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>고객 접수 확인 메일 재발송</span>
                  </button>
                </div>

                {resendMessage && (
                  <p className="text-xs text-amber-300 font-semibold bg-amber-500/10 p-2 rounded border border-amber-500/20">
                    {resendMessage}
                  </p>
                )}
              </div>

              {/* Inquiry Details Table */}
              <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="font-bold text-amber-400 border-b border-slate-800 pb-2">접수 상세 내용</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-slate-300">
                  <div><strong className="text-slate-400">담당자:</strong> {selectedInquiry.contactName}</div>
                  <div><strong className="text-slate-400">연락처:</strong> {selectedInquiry.phone}</div>
                  <div><strong className="text-slate-400">이메일:</strong> {selectedInquiry.email}</div>
                  <div><strong className="text-slate-400">단체유형:</strong> {selectedInquiry.groupType}</div>
                  <div><strong className="text-slate-400">문의유형:</strong> {selectedInquiry.inquiryType}</div>
                  <div><strong className="text-slate-400">예상인원:</strong> {selectedInquiry.estimatedCount || '미정'}</div>
                  <div><strong className="text-slate-400">출발예정:</strong> {selectedInquiry.startDate || '미정'}</div>
                  <div><strong className="text-slate-400">여행기간:</strong> {selectedInquiry.duration || '미정'}</div>
                  <div><strong className="text-slate-400">희망프로그램:</strong> {selectedInquiry.preferredProgram || '없음'}</div>
                  <div><strong className="text-slate-400">방문희망기관:</strong> {selectedInquiry.targetInstitution || '없음'}</div>
                  <div><strong className="text-slate-400">예상예산:</strong> {selectedInquiry.budget || '미정'}</div>
                  <div><strong className="text-slate-400">회신희망일:</strong> {selectedInquiry.replyWishDate || '빠른 회신'}</div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <strong className="text-slate-400 block mb-1">문의 및 요청 내용:</strong>
                  <div className="bg-slate-900 p-3 rounded-lg text-slate-200 whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {selectedInquiry.message}
                  </div>
                </div>

                {selectedInquiry.attachmentName && (
                  <div className="pt-2 text-slate-300">
                    <strong className="text-slate-400">첨부파일:</strong> 📎 {selectedInquiry.attachmentName}
                  </div>
                )}
              </div>

              {/* Admin Memo Editor */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-amber-400 uppercase">
                  관리자 전용 메모
                </label>
                <textarea
                  rows={3}
                  value={adminMemoInput}
                  onChange={(e) => setAdminMemoInput(e.target.value)}
                  placeholder="담당자 처리 이력 및 가이드 배정 특이사항 기재..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => handleSaveMemo(selectedInquiry.id)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  메모 저장
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
