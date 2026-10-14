"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDirectWhatsAppUrl, WHATSAPP_CONFIG } from "@/lib/whatsapp";

export function WhatsAppRedirectBanner() {
  const searchParams = useSearchParams();
  const shouldAutoRedirect = searchParams.get("auto_redirect") === "1";

  const [whatsappUrl, setWhatsappUrl] = useState<string>("");
  const [leadName, setLeadName] = useState<string>("");
  const [secondsLeft, setSecondsLeft] = useState<number>(3);
  const [isPaused, setIsPaused] = useState<boolean>(!shouldAutoRedirect);
  const [hasRedirected, setHasRedirected] = useState<boolean>(false);

  useEffect(() => {
    // Recupera a URL personalizada do lead ou fallback para URL direta
    let storedUrl = "";
    let storedName = "";

    try {
      storedUrl = sessionStorage.getItem("lead_whatsapp_url") || "";
      storedName = sessionStorage.getItem("lead_name") || "";
    } catch {
      // sessionStorage indisponível em alguns modos privados
    }

    const finalUrl = storedUrl || getDirectWhatsAppUrl();
    setWhatsappUrl(finalUrl);
    setLeadName(storedName);

    // Se não houver solicitação de auto-redirect, não inicia a contagem regressiva
    if (!shouldAutoRedirect) {
      return;
    }

    // Contagem regressiva de 3 segundos para dar tempo de visualizar a página de obrigado
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [shouldAutoRedirect]);

  // Efeito disparado quando a contagem atinge 0
  useEffect(() => {
    if (secondsLeft === 0 && !isPaused && !hasRedirected && whatsappUrl) {
      setHasRedirected(true);
      window.location.href = whatsappUrl;
    }
  }, [secondsLeft, isPaused, hasRedirected, whatsappUrl]);

  const handleManualOpen = () => {
    setHasRedirected(true);
    setIsPaused(true);
    if (whatsappUrl) {
      window.location.href = whatsappUrl;
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  if (!whatsappUrl) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Redirecionamento para WhatsApp"
      className="mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#000030] via-[#000044] to-[#0a1f33] border-2 border-[#25D366] shadow-[0_0_40px_rgba(37,211,102,0.18)] text-white relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold uppercase tracking-wider w-fit">
            <span className="relative flex h-2.5 w-2.5">
              {!isPaused && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
              )}
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
            </span>
            <span>
              {isPaused
                ? "Atendimento pronto no WhatsApp"
                : `Redirecionando em ${secondsLeft}s`}
            </span>
          </div>

          <span className="text-xs text-[#FEFEFE]/70 font-mono">
            Destino: Dr. Ronney Menezes · {WHATSAPP_CONFIG.displayNumber}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-2">
          {leadName ? `${leadName}, sua` : "Sua"} solicitação foi registrada!
        </h2>

        <p className="text-sm sm:text-base text-[#FEFEFE]/85 mb-6 max-w-2xl leading-relaxed">
          {isPaused
            ? "Os dados do seu caso estão estruturados. Clique no botão abaixo para abrir a conversa oficial no WhatsApp e iniciar a triagem técnica com o Dr. Ronney Menezes."
            : `Estamos abrindo a conversa oficial no WhatsApp em ${secondsLeft} ${secondsLeft === 1 ? "segundo" : "segundos"} com a mensagem formatada para agilizar sua análise.`}
        </p>

        {/* Progress Bar (se estiver em contagem regressiva) */}
        {!isPaused && (
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-6 overflow-hidden">
            <div
              className="bg-[#25D366] h-full transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${((3 - secondsLeft) / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={handleManualOpen}
            className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 py-3.5 rounded-lg font-bold text-sm sm:text-base text-[#000044] bg-[#25D366] hover:bg-[#22bf5b] transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#25D366]/25 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
          >
            <svg
              className="w-5 h-5 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Abrir conversa no WhatsApp agora</span>
            <span>→</span>
          </button>

          {!isPaused && (
            <button
              type="button"
              onClick={handlePause}
              className="text-xs text-[#FEFEFE]/75 hover:text-white underline underline-offset-4 py-2 px-3 text-center transition-colors cursor-pointer"
            >
              Pausar redirecionamento e ler orientações da página
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
