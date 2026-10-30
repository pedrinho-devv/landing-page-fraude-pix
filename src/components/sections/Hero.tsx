import React from "react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { landingContent } from "@/content/landing";

interface HeroProps {
  videoUrl?: string;
  posterUrl?: string;
}

export function Hero({ videoUrl, posterUrl }: HeroProps) {
  const { hero } = landingContent;
  const hasVideo = Boolean(videoUrl);

  return (
    <section className="relative pt-6 pb-10 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-[#000044] text-[#FEFEFE] border-b border-[#FEFEFE]/10">
      <Container>
        <div
          className={`grid items-center gap-10 lg:gap-12 ${
            "lg:grid-cols-[1.2fr_1fr]"
          }`}
        >
          {/* Main Copy Column */}
          <div className="flex flex-col items-start text-left">
            {/* Tag / Category Badge */}
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FABD04] mb-4">
              {hero.label}
            </span>

            {/* H1 Headline */}
            <h1 className="fluid-h1 text-[#FEFEFE] mb-6">
              {hero.titlePrefix}
              <span className="text-[#FABD04] underline decoration-[#FABD04]/30 decoration-2 underline-offset-4">
                {hero.titleHighlight}
              </span>
              {hero.titleSuffix}
            </h1>

            {/* Support Paragraph */}
            <p className="reading-body text-[#FEFEFE]/90 font-medium mb-4 text-base sm:text-lg">
              {hero.support}
            </p>

            {/* Complement Paragraph */}
            <p className="hidden sm:block reading-body text-[#FEFEFE]/75 text-sm sm:text-base mb-6">
              {hero.complement}
            </p>

            {/* Target Audience Notice */}
            <div className="hidden sm:flex w-full items-center gap-2 py-3 px-4 rounded-lg bg-[#FEFEFE]/5 border border-[#FEFEFE]/10 mb-8 text-xs sm:text-sm text-[#FEFEFE]/90">
              <span
                className="w-2 h-2 rounded-full bg-[#FABD04] shrink-0"
                aria-hidden="true"
              />
              <span>{hero.audienceLine}</span>
            </div>

            {/* CTA Button and Disclaimer Note (rendered above video on mobile) */}
            <div className="w-full sm:w-auto flex flex-col sm:items-start gap-3">
              <PrimaryLink
                href="#analise"
                position="hero"
                id="hero-cta-btn"
                className="w-full sm:w-auto text-base sm:text-lg px-8 py-4 shadow-lg shadow-black/20"
              >
                {hero.cta}
              </PrimaryLink>

              <p className="hidden sm:block text-xs text-[#FEFEFE]/65 max-w-md">
                {hero.note}
              </p>
            </div>
          </div>

          <div id="analise" className="anchor-section w-full"><LeadForm /></div>

          {/* Video Player Column (Only rendered if videoUrl is configured) */}
          {hasVideo && (
            <div className="w-full mt-4 lg:mt-0 order-last">
              <VideoPlayer
                videoUrl={videoUrl}
                posterUrl={posterUrl}
                title="Vídeo sobre a análise de fraudes via Pix"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
