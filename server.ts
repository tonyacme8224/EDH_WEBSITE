import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Setup file upload handling with Multer
const uploadDir = path.join(__dirname, 'data', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg', '.zip', '.hwp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('허용되지 않는 파일 형식입니다. (PDF, Word, Excel, PPT, Image, ZIP, HWP 가능)'));
    }
  },
});

// Setup JSON storage file for inquiries
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const inquiriesFilePath = path.join(dataDir, 'inquiries.json');

function loadInquiries() {
  try {
    if (fs.existsSync(inquiriesFilePath)) {
      const data = fs.readFileSync(inquiriesFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading inquiries:', err);
  }
  return [];
}

function saveInquiries(inquiries: any[]) {
  try {
    fs.writeFileSync(inquiriesFilePath, JSON.stringify(inquiries, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving inquiries:', err);
  }
}

// Config
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'acme8224@gmail.com';
const SITE_URL = process.env.SITE_URL || process.env.APP_URL || 'https://ais-dev-dcq4okdx3j6pbv4wf3txna-188009842506.asia-northeast1.run.app';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Everyday Holidays <noreply@everydayholidays.com>';

// Create Nodemailer Transporter
function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  // Fallback to test/sendgrid/gmail transporter if specified
  if (process.env.EMAIL_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.EMAIL_API_KEY,
      },
    });
  }
  return null;
}

// Send Admin Email
async function sendAdminNotificationEmail(inquiry: any) {
  const transporter = createTransporter();
  const adminDetailLink = `${SITE_URL}/admin?inquiryId=${inquiry.id}`;

  const subject = `[Everyday Holidays 신규 상담문의] ${inquiry.companyName} / ${inquiry.contactName}`;
  const html = `
    <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 650px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
      <div style="border-bottom: 3px solid #1e3a8a; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="color: #1e3a8a; margin: 0; font-size: 20px;">Everyday Holidays 신규 B2B 상담문의 접수</h2>
        <p style="color: #64748b; font-size: 13px; margin: 5px 0 0 0;">Singapore Group Travel & MICE Specialist</p>
      </div>

      <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #1e3a8a;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
          <tr><td style="padding: 6px 0; width: 130px; font-weight: bold;">접수번호:</td><td>${inquiry.id}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">접수일시:</td><td>${new Date(inquiry.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">회사/기관명:</td><td><strong style="color: #1e3a8a;">${inquiry.companyName}</strong></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">담당자명:</td><td>${inquiry.contactName}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">연락처:</td><td>${inquiry.phone}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">이메일:</td><td><a href="mailto:${inquiry.email}" style="color: #2563eb;">${inquiry.email}</a></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">단체 유형:</td><td><span style="background: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${inquiry.groupType}</span></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">문의 유형:</td><td><span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${inquiry.inquiryType}</span></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">예상 인원:</td><td>${inquiry.estimatedCount || '미정'} 명</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">출발 예정일:</td><td>${inquiry.startDate || '미정'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">여행 기간:</td><td>${inquiry.duration || '미정'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">희망 프로그램:</td><td>${inquiry.preferredProgram || '없음'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">방문 희망기관:</td><td>${inquiry.targetInstitution || '없음'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">예상 예산:</td><td>${inquiry.budget || '미정'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">입찰 여부:</td><td>${inquiry.isBidding ? `예 (마감일: ${inquiry.biddingDeadline || '미지정'})` : '아니오'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">회신 희망일:</td><td>${inquiry.replyWishDate || '빠른 회신 요망'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">첨부파일:</td><td>${inquiry.attachmentName ? `📎 ${inquiry.attachmentName}` : '없음'}</td></tr>
        </table>
      </div>

      <div style="margin-bottom: 25px;">
        <h4 style="color: #1e3a8a; margin: 0 0 10px 0; font-size: 15px;">상세 문의 내용:</h4>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; padding: 15px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #1e293b; whitespace: pre-wrap;">
          ${inquiry.message.replace(/\n/g, '<br/>')}
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <a href="${adminDetailLink}" target="_blank" style="display: inline-block; background-color: #1e3a8a; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; font-size: 14px;">
          관리자페이지에서 문의 상세 보기
        </a>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log(`[EMAIL SIMULATION - ADMIN] Sent to ${ADMIN_EMAIL}:`, subject);
    return { success: true, simulated: true };
  }

  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject,
      html,
    });
    return { success: true, simulated: false };
  } catch (err: any) {
    console.error('Failed to send admin email:', err);
    return { success: false, error: err.message };
  }
}

// Send Customer Confirmation Email
async function sendCustomerConfirmationEmail(inquiry: any) {
  const transporter = createTransporter();

  const subject = `[Everyday Holidays] 상담문의가 접수되었습니다`;
  const html = `
    <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="color: #1e3a8a; margin: 0; font-size: 20px;">Everyday Holidays</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Singapore Group Travel & MICE Specialist</p>
      </div>

      <p style="font-size: 15px; color: #334155; line-height: 1.6;">
        안녕하세요, <strong>${inquiry.contactName}</strong>님.<br/>
        Everyday Holidays에 상담문의를 남겨주셔서 감사드립니다.
      </p>

      <p style="font-size: 14px; color: #475569; line-height: 1.6;">
        접수해 주신 단체 정보와 요청사항을 신속히 검토한 후,<br/>
        담당자가 입력하신 연락처 또는 이메일로 빠르게 회신드리겠습니다.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0;">
        <h4 style="margin: 0 0 12px 0; color: #1e3a8a; font-size: 14px; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">접수 기본 정보</h4>
        <table style="width: 100%; font-size: 13px; color: #334155;">
          <tr><td style="padding: 4px 0; width: 120px; font-weight: bold; color: #64748b;">접수번호:</td><td><strong>${inquiry.id}</strong></td></tr>
          <tr><td style="padding: 4px 0; font-weight: bold; color: #64748b;">회사명/기관명:</td><td>${inquiry.companyName}</td></tr>
          <tr><td style="padding: 4px 0; font-weight: bold; color: #64748b;">출발 예정일:</td><td>${inquiry.startDate || '미정'}</td></tr>
          <tr><td style="padding: 4px 0; font-weight: bold; color: #64748b;">예상 인원:</td><td>${inquiry.estimatedCount || '미정'} 명</td></tr>
        </table>
      </div>

      <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
        추가 자료 제출이나 긴급한 상담이 필요하신 경우 아래 연락처로 문의해 주시기 바랍니다.
      </p>

      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        <strong>Everyday Holidays</strong> | Singapore Group Travel & MICE Specialist<br/>
        싱가포르 학생단체·MICE·기관연수 전문 현지 랜드사<br/>
        이메일: ${ADMIN_EMAIL}
      </div>
    </div>
  `;

  if (!transporter) {
    console.log(`[EMAIL SIMULATION - CUSTOMER] Sent to ${inquiry.email}:`, subject);
    return { success: true, simulated: true };
  }

  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: inquiry.email,
      subject,
      html,
    });
    return { success: true, simulated: false };
  } catch (err: any) {
    console.error('Failed to send customer email:', err);
    return { success: false, error: err.message };
  }
}

// API Routes
app.post('/api/inquiries', upload.single('attachment'), async (req, res) => {
  try {
    const {
      companyName,
      contactName,
      phone,
      email,
      groupType,
      inquiryType,
      estimatedCount,
      startDate,
      duration,
      message,
      preferredProgram,
      targetInstitution,
      budget,
      isBidding,
      biddingDeadline,
      replyWishDate,
      privacyAgreed,
    } = req.body;

    if (!companyName || !contactName || !phone || !email || !groupType || !inquiryType || !message || !privacyAgreed) {
      return res.status(400).json({ success: false, message: '필수 입력 항목을 확인해 주세요.' });
    }

    // Generate unique inquiry ID (e.g. EH-20260801-9823)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const inquiryId = `EH-${dateStr}-${randomCode}`;

    const attachmentName = req.file ? req.file.originalname : null;
    const attachmentPath = req.file ? req.file.path : null;

    const newInquiry = {
      id: inquiryId,
      createdAt: new Date().toISOString(),
      companyName,
      contactName,
      phone,
      email,
      groupType,
      inquiryType,
      estimatedCount: estimatedCount || '',
      startDate: startDate || '',
      duration: duration || '',
      message,
      preferredProgram: preferredProgram || '',
      targetInstitution: targetInstitution || '',
      budget: budget || '',
      isBidding: isBidding === 'true' || isBidding === true,
      biddingDeadline: biddingDeadline || '',
      replyWishDate: replyWishDate || '',
      attachmentName,
      attachmentPath,
      status: '신규',
      adminMemo: '',
      dbSaved: true,
      adminEmailStatus: 'PENDING',
      adminEmailError: '',
      adminEmailSentAt: null,
      customerEmailStatus: 'PENDING',
      customerEmailError: '',
      customerEmailSentAt: null,
    };

    // 1. Save to Database first
    const inquiries = loadInquiries();
    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

    // 2. Send Admin Email
    const adminResult = await sendAdminNotificationEmail(newInquiry);
    if (adminResult.success) {
      newInquiry.adminEmailStatus = adminResult.simulated ? 'SENT (SIMULATED)' : 'SENT';
      newInquiry.adminEmailSentAt = new Date().toISOString();
    } else {
      newInquiry.adminEmailStatus = 'FAILED';
      newInquiry.adminEmailError = adminResult.error || '이메일 전송 실패';
    }

    // 3. Send Customer Email
    const customerResult = await sendCustomerConfirmationEmail(newInquiry);
    if (customerResult.success) {
      newInquiry.customerEmailStatus = customerResult.simulated ? 'SENT (SIMULATED)' : 'SENT';
      newInquiry.customerEmailSentAt = new Date().toISOString();
    } else {
      newInquiry.customerEmailStatus = 'FAILED';
      newInquiry.customerEmailError = customerResult.error || '이메일 전송 실패';
    }

    // Update updated inquiry in DB
    saveInquiries(inquiries);

    return res.json({
      success: true,
      inquiryId,
      dbSaved: true,
      adminEmailStatus: newInquiry.adminEmailStatus,
      customerEmailStatus: newInquiry.customerEmailStatus,
      message: '상담문의가 정상적으로 접수되었습니다. 담당자가 내용을 검토한 후 연락드리겠습니다.',
    });
  } catch (err: any) {
    console.error('Error handling inquiry POST:', err);
    return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' });
  }
});

// Admin GET List
app.get('/api/inquiries', (req, res) => {
  const inquiries = loadInquiries();
  return res.json({ success: true, inquiries });
});

// Admin Update Status & Memo
app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status, adminMemo } = req.body;

  const inquiries = loadInquiries();
  const index = inquiries.findIndex((item: any) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: '해당 문의를 찾을 수 없습니다.' });
  }

  if (status) inquiries[index].status = status;
  if (adminMemo !== undefined) inquiries[index].adminMemo = adminMemo;

  saveInquiries(inquiries);
  return res.json({ success: true, inquiry: inquiries[index] });
});

// Admin Resend Email
app.post('/api/inquiries/:id/resend-email', async (req, res) => {
  const { id } = req.params;
  const { target } = req.body; // 'admin' or 'customer'

  const inquiries = loadInquiries();
  const index = inquiries.findIndex((item: any) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: '해당 문의를 찾을 수 없습니다.' });
  }

  const inquiry = inquiries[index];

  if (target === 'admin') {
    const result = await sendAdminNotificationEmail(inquiry);
    if (result.success) {
      inquiry.adminEmailStatus = result.simulated ? 'SENT (SIMULATED)' : 'SENT';
      inquiry.adminEmailSentAt = new Date().toISOString();
      inquiry.adminEmailError = '';
    } else {
      inquiry.adminEmailStatus = 'FAILED';
      inquiry.adminEmailError = result.error || '재발송 실패';
    }
  } else if (target === 'customer') {
    const result = await sendCustomerConfirmationEmail(inquiry);
    if (result.success) {
      inquiry.customerEmailStatus = result.simulated ? 'SENT (SIMULATED)' : 'SENT';
      inquiry.customerEmailSentAt = new Date().toISOString();
      inquiry.customerEmailError = '';
    } else {
      inquiry.customerEmailStatus = 'FAILED';
      inquiry.customerEmailError = result.error || '재발송 실패';
    }
  }

  saveInquiries(inquiries);
  return res.json({ success: true, inquiry });
});

// Admin Login Check
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === 'admin1234' || password === 'everyday1234' || password === 'acme8224') {
    return res.json({ success: true, token: 'auth-token-everyday-holidays' });
  }
  return res.status(401).json({ success: false, message: '비밀번호가 올바르지 않습니다.' });
});

// Setup Vite or Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) return next();
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      if (req.originalUrl.startsWith('/api')) return;
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Everyday Holidays B2B Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
