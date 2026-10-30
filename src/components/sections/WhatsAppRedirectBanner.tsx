"use client";
import { getDirectWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
export function WhatsAppRedirectBanner() {
  return <div className="mb-8 p-6 rounded-xl border border-[#FEFEFE]/20">
    <h2 className="text-xl font-bold mb-2">Seu cadastro foi confirmado.</h2>
    <p className="text-sm text-white/85 mb-5">A equipe poderá retornar pelo WhatsApp informado. Se preferir, abra uma conversa agora. Seu cadastro já foi enviado, mesmo que você não abra o WhatsApp.</p>
    <a href={getDirectWhatsAppUrl()} onClick={() => trackEvent({ name: "ClicouWhatsApp" })} className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#FABD04] px-6 py-3 font-bold text-[#000044]">Abrir o WhatsApp</a>
    <p className="text-xs text-white/70 mt-4">Nunca pediremos senha, código de verificação ou acesso à sua conta bancária.</p>
  </div>;
}
