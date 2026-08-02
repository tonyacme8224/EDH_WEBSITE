import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import Busboy from 'busboy';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
};

// Check & log environment variables status
function checkEnvVars() {
  const missing: string[] = [];
  if (!process.env.SUPABASE_URL) missing.push('SUPABASE_URL');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_KEY && !process.env.SUPABASE_ANON_KEY) {
    missing.push('SUPABASE_SERVICE_ROLE_KEY');
  }
  if (!process.env.RESEND_API_KEY) missing.push('RESEND_API_KEY');

  if (missing.length > 0) {
    console.warn(`[Netlify Function Log] Missing environment variables: ${missing.join(', ')}.`);
  } else {
    console.log('[Netlify Function Log] All primary environment variables configured correctly.');
  }
}

// Parse request body for both JSON and multipart/form-data
async function parseBody(event: any): Promise<{
  fields: Record<string, any>;
  file?: { filename: string; mimeType: string; data: Buffer };
}> {
  const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
  const isBase64 = event.isBase64Encoded;
  const rawBuffer = Buffer.from(event.body || '', isBase64 ? 'base64' : 'utf-8');

  if (contentType.includes('application/json')) {
    try {
      const parsed = JSON.parse(rawBuffer.toString('utf-8'));
      return { fields: parsed };
    } catch (err) {
      console.error('[Netlify Function Log] JSON parse error:', err);
      return { fields: {} };
    }
  }

  if (contentType.includes('multipart/form-data')) {
    return new Promise((resolve) => {
      const fields: Record<string, any> = {};
      let uploadedFile: { filename: string; mimeType: string; data: Buffer } | undefined;

      try {
        const busboy = Busboy({ headers: { 'content-type': contentType } });

        busboy.on('field', (fieldname, val) => {
          fields[fieldname] = val;
        });

        busboy.on('file', (fieldname, file, info) => {
          const { filename, mimeType } = info;
          const chunks: Buffer[] = [];
          file.on('data', (chunk) => chunks.push(chunk));
          file.on('end', () => {
            if (filename) {
              uploadedFile = {
                filename,
                mimeType,
                data: Buffer.concat(chunks),
              };
            }
          });
        });

        busboy.on('finish', () => {
          resolve({ fields, file: uploadedFile });
        });

        busboy.on('error', (err) => {
          console.error('[Netlify Function Log] Busboy parsing error:', err);
          resolve({ fields, file: uploadedFile });
        });

        busboy.write(rawBuffer);
        busboy.end();
      } catch (err) {
        console.error('[Netlify Function Log] Busboy init error:', err);
        resolve({ fields: {} });
      }
    });
  }

  // Fallback URL encoded
  try {
    const params = new URLSearchParams(rawBuffer.toString('utf-8'));
    const fields: Record<string, any> = {};
    params.forEach((val, key) => {
      fields[key] = val;
    });
    return { fields };
  } catch {
    return { fields: {} };
  }
}

export const handler = async (event: any) => {
  // CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 452,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
    };
  }

  checkEnvVars();

  try {
    const { fields, file } = await parseBody(event);

    const companyName = fields.companyName || fields.company_name;
    const contactName = fields.contactName || fields.contact_name;
    const phone = fields.phone;
    const email = fields.email;
    const groupType = fields.groupType || fields.group_type;
    const inquiryType = fields.inquiryType || fields.inquiry_type;
    const estimatedCount = fields.estimatedCount || fields.estimated_count;
    const startDate = fields.startDate || fields.start_date;
    const duration = fields.duration;
    const message = fields.message;
    const preferredProgram = fields.preferredProgram || fields.preferred_program;
    const targetInstitution = fields.targetInstitution || fields.target_institution;
    const budget = fields.budget;
    const isBidding = fields.isBidding === true || fields.isBidding === 'true';
    const biddingDeadline = fields.biddingDeadline || fields.bidding_deadline;
    const replyWishDate = fields.replyWishDate || fields.reply_wish_date;
    const privacyAgreed = fields.privacyAgreed === true || fields.privacyAgreed === 'true';

    // 1. Server Validation
    if (!companyName || !contactName || !phone || !email || !message || !privacyAgreed) {
      console.warn('[Netlify Function Log] Required fields missing:', { companyName, contactName, phone, email, privacyAgreed });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: '모든 필수 입력 항목(*)을 작성해 주세요.',
        }),
      };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim())) {
      console.warn('[Netlify Function Log] Invalid email format:', email);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: '올바른 이메일 주소 형식을 입력해 주세요.',
        }),
      };
    }

    // File size check (10MB max)
    if (file && file.data && file.data.length > 10 * 1024 * 1024) {
      console.warn('[Netlify Function Log] File size exceeded 10MB limit:', file.data.length);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: '첨부파일 크기는 최대 10MB까지 업로드 가능합니다.',
        }),
      };
    }

    // Generate Inquiry ID (EH-20260801-4921)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const inquiryId = `EH-${dateStr}-${randomCode}`;
    const createdAt = new Date().toISOString();

    let attachmentName = file?.filename || fields.attachmentName || '';
    let attachmentUrl = fields.attachmentUrl || '';

    // 2. Initialize Supabase if credentials present
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_KEY ||
      process.env.SUPABASE_ANON_KEY;

    let supabase: any = null;
    if (supabaseUrl && supabaseKey) {
      supabase = createClient(supabaseUrl, supabaseKey);
    }

    // Upload attachment to Supabase Storage if file is attached and bucket exists
    if (file && supabase) {
      try {
        const fileExt = file.filename.split('.').pop() || 'file';
        const storagePath = `inquiries/${inquiryId}_${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('inquiry-attachments')
          .upload(storagePath, file.data, {
            contentType: file.mimeType,
            upsert: true,
          });

        if (uploadError) {
          console.warn('[Netlify Function Log] Supabase storage upload warning (proceeding without file URL):', uploadError.message);
        } else if (uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('inquiry-attachments')
            .getPublicUrl(storagePath);
          attachmentUrl = publicUrlData?.publicUrl || '';
        }
      } catch (attErr: any) {
        console.warn('[Netlify Function Log] Attachment processing warning (proceeding with inquiry save):', attErr.message);
      }
    }

    // Save Inquiry Record to Supabase
    let dbSaved = false;
    let dbErrorMessage = '';

    const record = {
      id: inquiryId,
      created_at: createdAt,
      createdAt: createdAt,
      company_name: companyName,
      companyName: companyName,
      contact_name: contactName,
      contactName: contactName,
      phone: String(phone),
      email: String(email).trim(),
      group_type: groupType || '기타',
      groupType: groupType || '기타',
      inquiry_type: inquiryType || '맞춤 일정 및 견적',
      inquiryType: inquiryType || '맞춤 일정 및 견적',
      estimated_count: estimatedCount || '',
      estimatedCount: estimatedCount || '',
      start_date: startDate || '',
      startDate: startDate || '',
      duration: duration || '',
      message: message,
      preferred_program: preferredProgram || '',
      preferredProgram: preferredProgram || '',
      target_institution: targetInstitution || '',
      targetInstitution: targetInstitution || '',
      budget: budget || '',
      is_bidding: isBidding,
      isBidding: isBidding,
      bidding_deadline: biddingDeadline || '',
      biddingDeadline: biddingDeadline || '',
      reply_wish_date: replyWishDate || '',
      replyWishDate: replyWishDate || '',
      attachment_name: attachmentName,
      attachmentName: attachmentName,
      attachment_url: attachmentUrl,
      attachmentUrl: attachmentUrl,
      status: '신규',
      admin_memo: '',
      adminMemo: '',
    };

    if (supabase) {
      try {
        const { error: dbError } = await supabase.from('inquiries').insert([record]);
        if (dbError) {
          console.error('[Netlify Function Log] Supabase DB Insert Error:', dbError.message);
          dbErrorMessage = dbError.message;
        } else {
          dbSaved = true;
          console.log(`[Netlify Function Log] Inquiry ${inquiryId} saved successfully to Supabase DB.`);
        }
      } catch (dbErr: any) {
        console.error('[Netlify Function Log] Supabase exception:', dbErr.message);
        dbErrorMessage = dbErr.message;
      }
    } else {
      console.warn('[Netlify Function Log] SUPABASE_URL/KEY not set. Operating in fallback mode.');
      // Treat as saved in memory/log so local preview or test deployments don't block
      dbSaved = true;
    }

    if (!dbSaved && supabase) {
      console.error('[Netlify Function Log] Failed to save inquiry to database.');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: '상담문의 접수 중 오류가 발생했습니다.',
        }),
      };
    }

    // 3. Send Emails via Resend if RESEND_API_KEY is available
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'acme8224@gmail.com';
    const siteUrl = process.env.SITE_URL || 'https://everydayholidays.co.kr';
    const emailFrom = process.env.EMAIL_FROM || 'Everyday Holidays <onboarding@resend.dev>';

    let adminEmailSent = false;
    let customerEmailSent = false;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        // Admin Notification Email HTML
        const adminHtml = `
          <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 650px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <div style="border-bottom: 3px solid #009886; padding-bottom: 15px; margin-bottom: 20px;">
              <h2 style="color: #009886; margin: 0; font-size: 20px;">Everyday Holidays 신규 B2B 상담문의 접수</h2>
              <p style="color: #64748b; font-size: 13px; margin: 5px 0 0 0;">Singapore Group Travel & MICE Specialist</p>
            </div>

            <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #009886;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
                <tr><td style="padding: 6px 0; width: 130px; font-weight: bold;">접수번호:</td><td>${inquiryId}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">접수일시:</td><td>${new Date(createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">회사/기관명:</td><td><strong style="color: #009886;">${companyName}</strong></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">담당자명:</td><td>${contactName}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">연락처:</td><td>${phone}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">이메일:</td><td><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">단체 유형:</td><td><span style="background: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${groupType}</span></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">문의 유형:</td><td><span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${inquiryType}</span></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">예상 인원:</td><td>${estimatedCount || '미정'} 명</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">출발 예정일:</td><td>${startDate || '미정'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">여행 기간:</td><td>${duration || '미정'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">희망 프로그램:</td><td>${preferredProgram || '없음'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">방문 희망기관:</td><td>${targetInstitution || '없음'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">예상 예산:</td><td>${budget || '미정'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">입찰 여부:</td><td>${isBidding ? `예 (마감일: ${biddingDeadline || '미지정'})` : '아니오'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">회신 희망일:</td><td>${replyWishDate || '빠른 회신 요망'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">첨부파일:</td><td>${attachmentName ? `📎 ${attachmentName}` : '없음'}</td></tr>
              </table>
            </div>

            <div style="margin-bottom: 25px;">
              <h4 style="color: #009886; margin: 0 0 10px 0; font-size: 15px;">상세 문의 내용:</h4>
              <div style="background-color: #ffffff; border: 1px solid #cbd5e1; padding: 15px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <a href="${siteUrl}/admin?inquiryId=${inquiryId}" target="_blank" style="display: inline-block; background-color: #009886; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                관리자페이지에서 문의 상세 보기
              </a>
            </div>
          </div>
        `;

        // Send to Admin
        const adminRes = await resend.emails.send({
          from: emailFrom,
          to: adminEmail,
          subject: `[Everyday Holidays 신규 상담문의] ${companyName} / ${contactName}`,
          html: adminHtml,
        });

        if (adminRes.error) {
          console.error('[Netlify Function Log] Resend Admin Email Error:', adminRes.error);
        } else {
          adminEmailSent = true;
          console.log(`[Netlify Function Log] Admin notification sent to ${adminEmail}`);
        }

        // Customer Email HTML
        const customerHtml = `
          <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <div style="border-bottom: 2px solid #009886; padding-bottom: 15px; margin-bottom: 20px;">
              <h2 style="color: #009886; margin: 0; font-size: 20px;">Everyday Holidays</h2>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Singapore Group Travel & MICE Specialist</p>
            </div>

            <p style="font-size: 15px; color: #334155; line-height: 1.6;">
              안녕하세요, <strong>${contactName}</strong>님.<br/>
              Everyday Holidays에 상담문의를 남겨주셔서 감사드립니다.
            </p>

            <p style="font-size: 14px; color: #475569; line-height: 1.6;">
              접수해 주신 단체 정보와 요청사항을 신속히 검토한 후,<br/>
              담당자가 입력하신 연락처 또는 이메일로 빠르게 회신드리겠습니다.
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0;">
              <h4 style="margin: 0 0 12px 0; color: #009886; font-size: 14px; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">접수 기본 정보</h4>
              <table style="width: 100%; font-size: 13px; color: #334155;">
                <tr><td style="padding: 4px 0; width: 120px; font-weight: bold; color: #64748b;">접수번호:</td><td><strong>${inquiryId}</strong></td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold; color: #64748b;">회사명/기관명:</td><td>${companyName}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold; color: #64748b;">출발 예정일:</td><td>${startDate || '미정'}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold; color: #64748b;">예상 인원:</td><td>${estimatedCount ? `${estimatedCount}명` : '미정'}</td></tr>
              </table>
            </div>

            <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
              추가 자료 제출이나 긴급한 상담이 필요하신 경우 아래 연락처로 문의해 주시기 바랍니다.
            </p>

            <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
              <strong>Everyday Holidays</strong> | Singapore Group Travel & MICE Specialist<br/>
              싱가포르 학생단체·MICE·기관연수 전문 현지 랜드사<br/>
              이메일: ${adminEmail}
            </div>
          </div>
        `;

        // Send to Customer
        const customerRes = await resend.emails.send({
          from: emailFrom,
          to: email,
          subject: `[Everyday Holidays] 상담문의가 정상적으로 접수되었습니다`,
          html: customerHtml,
        });

        if (customerRes.error) {
          console.error('[Netlify Function Log] Resend Customer Email Error:', customerRes.error);
        } else {
          customerEmailSent = true;
          console.log(`[Netlify Function Log] Confirmation email sent to customer ${email}`);
        }
      } catch (resendErr: any) {
        console.error('[Netlify Function Log] Resend API Exception (Inquiry is still saved):', resendErr.message);
      }
    } else {
      console.warn('[Netlify Function Log] RESEND_API_KEY is not set. Skipping email dispatch.');
    }

    // Success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: '상담문의가 정상적으로 접수되었습니다.',
        inquiryId: inquiryId,
      }),
    };
  } catch (err: any) {
    console.error('[Netlify Function Log] Fatal execution error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: '상담문의 접수 중 오류가 발생했습니다.',
      }),
    };
  }
};
