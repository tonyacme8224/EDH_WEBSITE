export const WHATSAPP_PHONE = '821037260703';
export const WHATSAPP_DEFAULT_MSG = '안녕하세요. Everyday Holidays 홈페이지를 보고 문의드립니다.';
export const WHATSAPP_BUTTON_TEXT = 'WhatsApp으로 상담하기';

export const getWhatsAppLink = (message: string = WHATSAPP_DEFAULT_MSG) => {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};
