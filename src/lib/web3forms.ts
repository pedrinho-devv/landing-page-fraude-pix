import type { LeadFormData } from "./lead-schema";

// Web3Forms access keys are public form identifiers, not secret API tokens.
export const WEB3FORMS_ACCESS_KEY = "b3221117-eb88-433a-8206-ebd10a7c1f4e";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const CONFIRMATION_KEY = "web3forms-confirmed-lead";

export function web3FormsPayload(data: LeadFormData) {
  return {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: "Nova solicitação de análise — Fraude via Pix",
    from_name: "Site Dr. Ronney Menezes",
    name: data.fullName,
    ...(data.email ? { email: data.email } : {}),
    message: [
      `Nome: ${data.fullName}`,
      `WhatsApp: ${data.phone}`,
      `Empresa: ${data.companyName}`,
      `Vínculo com a empresa: ${data.companyRole}`,
      `Prejuízo aproximado: ${data.lossRange}`,
      `Comunicação ao banco: ${data.bankContacted}`,
    ].join("\n"),
    botcheck: Boolean(data.website_trap),
  };
}
export async function sendToWeb3Forms(data: LeadFormData, fetcher: typeof fetch = fetch) {
  const response = await fetcher(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(web3FormsPayload(data)),
    signal: AbortSignal.timeout(15000),
  });
  const result = await response.json();
  if (!response.ok || result.success !== true) {
    throw new Error("Não foi possível enviar sua solicitação. Tente novamente em alguns instantes.");
  }
}
