import { LeadFormData } from "@/lib/lead-schema";

export const WHATSAPP_CONFIG = {
  rawNumber: "5586981572651",
  displayNumber: "(86) 98157-2651",
};

/**
 * Formata os dados preenchidos no formulário em uma mensagem
 * estruturada, profissional e legível para o WhatsApp do Dr. Ronney Menezes.
 */
export function formatWhatsAppLeadMessage(data: LeadFormData): string {
  const emailLine = data.email && data.email.trim().length > 0
    ? `\n• *E-mail:* ${data.email.trim()}`
    : "";

  return [
    "⚖️ *SOLICITAÇÃO DE ANÁLISE — FRAUDE VIA PIX*",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "Olá, Dr. Ronney Menezes! Preenchi o formulário no site e gostaria de uma avaliação jurídica para o caso de fraude bancária da minha empresa.",
    "",
    "📋 *DADOS DO CONTATO*",
    `• *Nome completo:* ${data.fullName.trim()}`,
    `• *Nome da empresa:* ${data.companyName.trim()}`,
    `• *Telefone / WhatsApp:* ${data.phone.trim()}${emailLine}`,
    "",
    "💼 *DETALHES DA OCORRÊNCIA*",
    `• *Vínculo com a empresa:* ${data.companyRole}`,
    `• *Faixa do prejuízo:* ${data.lossRange}`,
    `• *Já comunicou ao banco:* ${data.bankContacted}`,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "Aguardo orientações sobre a viabilidade e os próximos passos para o caso.",
  ].join("\n");
}

/**
 * Retorna a URL completa para envio da mensagem via WhatsApp (wa.me)
 */
export function getWhatsAppUrl(data: LeadFormData): string {
  const message = formatWhatsAppLeadMessage(data);
  return `https://wa.me/${WHATSAPP_CONFIG.rawNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Retorna uma URL direta para iniciar conversa no WhatsApp
 */
export function getDirectWhatsAppUrl(customMessage?: string): string {
  const text = customMessage || "Olá, Dr. Ronney Menezes! Gostaria de falar sobre uma ocorrência de fraude bancária via Pix na minha empresa.";
  return `https://wa.me/${WHATSAPP_CONFIG.rawNumber}?text=${encodeURIComponent(text)}`;
}
