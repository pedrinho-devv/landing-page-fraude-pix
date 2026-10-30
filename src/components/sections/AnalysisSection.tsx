import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { landingContent } from "@/content/landing";

export function AnalysisSection() {
  const { form } = landingContent;

  return (
    <section
      className="anchor-section py-16 sm:py-24 lg:py-28 bg-[#000044] text-[#FEFEFE] border-b border-[#FEFEFE]/10"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Desktop intro) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28 self-start">
            <Reveal>
              <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FABD04] mb-3 py-1 px-2.5 rounded bg-[#FABD04]/10 border border-[#FABD04]/30">
                {form.label}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="fluid-h2 text-[#FEFEFE] mb-5">
                {form.title}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="reading-body text-sm sm:text-base text-[#FEFEFE]/85 mb-8">
                {form.support}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-5 rounded-xl bg-[#FEFEFE]/5 border border-[#FEFEFE]/15 text-xs sm:text-sm text-[#FEFEFE]/80 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-[#FABD04]">
                  <span className="w-2 h-2 rounded-full bg-[#FABD04]" />
                  <span>Para avaliar seu caso</span>
                </div>
                <p>
                  Conte o que aconteceu. Nossa equipe avalia as informações e orienta os próximos passos possíveis.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column (Form panel) */}
          <div id="analise" className="anchor-section lg:col-span-7 w-full">
            <Reveal delay={0.1}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
