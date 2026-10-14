import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThankYouTracker } from "@/components/analytics/ThankYouTracker";
import { WhatsAppRedirectBanner } from "@/components/sections/WhatsAppRedirectBanner";
import { landingContent } from "@/content/landing";
import { getDirectWhatsAppUrl, WHATSAPP_CONFIG } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: landingContent.obrigado.meta.title,
  description: landingContent.obrigado.meta.description,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ObrigadoPage() {
  const { obrigado } = landingContent;

  return (
    <main id="conteudo-principal" className="py-12 sm:py-20 bg-[#000044] text-[#FEFEFE] min-h-[calc(100vh-80px)]">
      <ThankYouTracker />

      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb / Return Link */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#FABD04] uppercase tracking-wider hover:underline focus-visible:outline-2 focus-visible:outline-[#FABD04] rounded px-1 -ml-1 transition-colors"
            >
              ← {obrigado.backButton}
            </Link>
          </div>

          {/* WhatsApp Direct Action / Countdown Banner */}
          <Suspense fallback={null}>
            <WhatsAppRedirectBanner />
          </Suspense>

          {/* Hero Confirmation Card */}
          <div className="relative overflow-hidden rounded-2xl bg-[#000038] border border-[#FEFEFE]/15 p-6 sm:p-10 mb-10 shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FABD04]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-start gap-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FABD04]/15 border border-[#FABD04]/30 text-[#FABD04] text-xs font-bold tracking-wide uppercase">
                <svg
                  className="w-4 h-4 text-[#FABD04]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{obrigado.badge}</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="fluid-h2 text-[#FEFEFE] tracking-tight">
                {obrigado.title}
              </h1>

              <p className="reading-body text-base sm:text-lg text-[#FEFEFE]/85 max-w-2xl">
                {obrigado.subtitle}
              </p>
            </div>
          </div>

          {/* Next Steps Section */}
          <div className="mb-12">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#FABD04] font-bold">
                PRÓXIMAS ETAPAS
              </span>
              <h2 className="fluid-h3 text-[#FEFEFE] mt-1">
                {obrigado.stepsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {obrigado.steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex flex-col justify-between p-6 rounded-xl bg-white/[0.04] border border-[#FEFEFE]/10 hover:border-[#FABD04]/30 transition-colors"
                >
                  <div>
                    <span className="inline-block text-2xl font-black text-[#FABD04] font-[family-name:var(--font-heading)] mb-3">
                      {step.number}
                    </span>
                    <h3 className="text-base font-bold text-[#FEFEFE] mb-2 font-[family-name:var(--font-heading)]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#FEFEFE]/75 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Documents Checklist */}
          <div className="rounded-2xl bg-white text-[#000044] p-6 sm:p-8 mb-10 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#FABD04]/25 flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-[#000044]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#000044] font-[family-name:var(--font-heading)]">
                {obrigado.documentsSection.title}
              </h3>
            </div>

            <ul className="space-y-3">
              {obrigado.documentsSection.items.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#000044]/90">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FABD04] text-[#000044] text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Urgent MED Warning Notice */}
          <div
            role="note"
            className="rounded-xl bg-[#FABD04]/10 border-2 border-[#FABD04]/40 p-6 sm:p-7 mb-10 text-sm leading-relaxed text-[#FEFEFE]"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0" aria-hidden="true">
                ⚠️
              </span>
              <div>
                <h4 className="text-base font-bold text-[#FABD04] mb-1 font-[family-name:var(--font-heading)]">
                  {obrigado.urgentNotice.title}
                </h4>
                <p className="text-sm text-[#FEFEFE]/90">
                  {obrigado.urgentNotice.text}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button & Back CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#FEFEFE]/15">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href={getDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg font-bold text-sm sm:text-base text-white bg-[#25D366] hover:bg-[#20ba59] transition-all duration-200 hover:-translate-y-0.5 shadow-md"
              >
                <svg
                  className="w-5 h-5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Falar no WhatsApp ({WHATSAPP_CONFIG.displayNumber})</span>
              </a>

              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg font-bold text-sm sm:text-base text-[#000044] bg-[#FABD04] transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FABD04] shadow-md"
              >
                {obrigado.backButton}
              </Link>
            </div>

            <span className="text-xs text-[#FEFEFE]/60 text-center sm:text-right">
              {landingContent.professional.name} · {landingContent.professional.location}
            </span>
          </div>

          {/* OAB / Compliance Disclaimer */}
          <p className="text-xs text-[#FEFEFE]/50 leading-relaxed mt-10 text-justify sm:text-left">
            {obrigado.disclaimer}
          </p>
        </div>
      </Container>
    </main>
  );
}
