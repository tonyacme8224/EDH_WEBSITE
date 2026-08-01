export interface Inquiry {
  id: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  groupType: string;
  inquiryType: string;
  estimatedCount: string;
  startDate: string;
  duration: string;
  message: string;
  preferredProgram?: string;
  targetInstitution?: string;
  budget?: string;
  isBidding?: boolean;
  biddingDeadline?: string;
  replyWishDate?: string;
  attachmentName?: string | null;
  attachmentPath?: string | null;
  status: '신규' | '확인 중' | '견적 작성 중' | '회신 완료' | '협의 중' | '계약 확정' | '보류' | '종료';
  adminMemo?: string;
  dbSaved: boolean;
  adminEmailStatus: string;
  adminEmailError?: string;
  adminEmailSentAt?: string | null;
  customerEmailStatus: string;
  customerEmailError?: string;
  customerEmailSentAt?: string | null;
}

export type PageView = 'home' | 'about' | 'student' | 'mice' | 'institution' | 'services' | 'inquiry' | 'admin';

export interface ServiceCategory {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  features: string[];
}
