import { createClient } from '@supabase/supabase-js';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
};

export const handler = async (event: any) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true }),
    };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.SUPABASE_ANON_KEY;

  let supabase: any = null;
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Admin Login
  if (event.path.endsWith('/admin/login') || event.path.endsWith('/login')) {
    try {
      const body = JSON.parse(event.body || '{}');
      const password = body.password;
      if (password === 'admin1234' || password === 'everyday1234' || password === 'acme8224') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, token: 'auth-token-everyday-holidays' }),
        };
      }
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, message: '비밀번호가 올바르지 않습니다.' }),
      };
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: '잘못된 요청입니다.' }),
      };
    }
  }

  // Admin GET inquiries list
  if (event.httpMethod === 'GET') {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('[Netlify Function Log] Supabase Fetch Error:', error.message);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, inquiries: [] }),
          };
        }

        // Map snake_case or camelCase
        const formatted = (data || []).map((item: any) => ({
          id: item.id,
          createdAt: item.created_at || item.createdAt,
          companyName: item.company_name || item.companyName,
          contactName: item.contact_name || item.contactName,
          phone: item.phone,
          email: item.email,
          groupType: item.group_type || item.groupType,
          inquiryType: item.inquiry_type || item.inquiryType,
          estimatedCount: item.estimated_count || item.estimatedCount,
          startDate: item.start_date || item.startDate,
          duration: item.duration,
          message: item.message,
          preferredProgram: item.preferred_program || item.preferredProgram,
          targetInstitution: item.target_institution || item.targetInstitution,
          budget: item.budget,
          isBidding: item.is_bidding ?? item.isBidding,
          biddingDeadline: item.bidding_deadline || item.biddingDeadline,
          replyWishDate: item.reply_wish_date || item.replyWishDate,
          attachmentName: item.attachment_name || item.attachmentName,
          attachmentUrl: item.attachment_url || item.attachmentUrl,
          status: item.status || '신규',
          adminMemo: item.admin_memo || item.adminMemo || '',
        }));

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, inquiries: formatted }),
        };
      } catch (err: any) {
        console.error('[Netlify Function Log] Exception fetching inquiries:', err.message);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, inquiries: [] }),
        };
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, inquiries: [] }),
    };
  }

  // Admin PATCH update status / memo
  if (event.httpMethod === 'PATCH') {
    try {
      const body = JSON.parse(event.body || '{}');
      const { id, status, adminMemo } = body;

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: 'Inquiry ID is required' }),
        };
      }

      if (supabase) {
        const updatePayload: any = {};
        if (status) {
          updatePayload.status = status;
        }
        if (adminMemo !== undefined) {
          updatePayload.admin_memo = adminMemo;
          updatePayload.adminMemo = adminMemo;
        }

        const { error } = await supabase
          .from('inquiries')
          .update(updatePayload)
          .eq('id', id);

        if (error) {
          console.error('[Netlify Function Log] Update Error:', error.message);
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: err.message }),
      };
    }
  }

  return {
    statusCode: 400,
    headers,
    body: JSON.stringify({ success: false, message: 'Invalid request' }),
  };
};
