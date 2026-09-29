import React from "react";
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { Reveal } from "@/components/motion/Reveal";
import { landingContent } from "@/content/landing";

export function AudienceCriteria() {
  const { audience } = landingContent;

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-[#000044] text-[#FEFEFE] border-b border-[#FEFEFE]/10">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col items-start mb-12 sm:mb-16">
          <Reveal>
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FABD04] mb-3 py-1 px-2.5 rounded bg-[#FABD04]/10 border border-[#FABD04]/30">
              {audience.label}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="fluid-h2 text-[#FEFEFE] mb-4">
              {audience.title}
            </h2>
          </Reveal>
        </div>

        {/* 2 Columns Delimited by Subtle Lines (No green/red traffic light) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10">
          {/* Column A */}
          <Reveal delay={0.1} className="h-full">
            <div className="h-full flex flex-col p-6 sm:p-8 rounded-xl bg-[#FEFEFE]/5 border border-[#FEFEFE]/15 shadow-sm">
              <h3 className="fluid-h3 text-[#FABD04] mb-6 border-b border-[#FEFEFE]/15 pb-3">
                {audience.columnA.title}
              </h3>
              <ul className="space-y-4 text-sm sm:text-base text-[#FEFEFE]/90">
                {audience.columnA.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#FABD04] mt-2 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="reading-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Column B */}
          <Reveal delay={0.15} className="h-full">
            <div className="h-full flex flex-col p-6 sm:p-8 rounded-xl bg-[#FEFEFE]/5 border border-[#FEFEFE]/15 shadow-sm">
              <h3 className="fluid-h3 text-[#FEFEFE] mb-6 border-b border-[#FEFEFE]/15 pb-3">
                {audience.columnB.title}
              </h3>
              <ul className="space-y-4 text-sm sm:text-base text-[#FEFEFE]/85">
                {audience.columnB.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#FEFEFE]/50 mt-2 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="reading-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Visible Note & CTA */}
        <Reveal delay={0.2} className="max-w-4xl mx-auto flex flex-col items-start gap-6">
          <div className="p-4 sm:p-5 rounded-lg bg-[#FEFEFE]/5 border border-[#FEFEFE]/10 text-xs sm:text-sm text-[#FEFEFE]/80 leading-relaxed">
            {audience.note}
          </div>

          <PrimaryLink
            href="#analise"
            position="audience"
            className="w-full sm:w-auto text-base sm:text-lg px-8 py-3.5"
          >
            {audience.cta}
          </PrimaryLink>
        </Reveal>
      </Container>
    </section>
  );
}
