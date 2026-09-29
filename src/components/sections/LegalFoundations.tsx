import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { landingContent } from "@/content/landing";

export function LegalFoundations() {
  const { foundations } = landingContent;

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-[#FEFEFE] text-[#000044] border-b border-[#000044]/10">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col items-start mb-12 sm:mb-16">
          <Reveal>
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#000044] mb-3 py-1 px-2.5 rounded bg-[#000044]/5 border border-[#000044]/15">
              {foundations.label}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="fluid-h2 text-[#000044] mb-4">
              {foundations.title}
            </h2>
          </Reveal>
        </div>

        {/* 3 Editorial Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {foundations.blocks.map((block, idx) => (
            <Reveal key={idx} delay={idx * 0.06} className="h-full">
              <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-white border border-[#000044]/15 shadow-sm hover:border-[#000044]/30 transition-colors">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#000044] mb-3">
                    {block.title}
                  </h3>
                  <p className="reading-body text-sm text-[#000044]/80 mb-6">
                    {block.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#000044]/10">
                  <span className="text-xs font-semibold text-[#000044]/60 uppercase tracking-wide block mb-1">
                    Referência / Fundamento:
                  </span>
                  {block.sourceUrl ? (
                    <a
                      href={block.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#000044] underline decoration-[#000044]/40 hover:decoration-[#000044] transition-colors"
                    >
                      {block.sourceLabel} ↗
                    </a>
                  ) : (
                    <span className="text-xs font-medium text-[#000044]">
                      {block.sourceLabel}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Note */}
        <Reveal delay={0.2} className="max-w-4xl mx-auto mb-8">
          <p className="text-xs sm:text-sm text-[#000044]/75 italic text-center sm:text-left">
            {foundations.note}
          </p>
        </Reveal>

        {/* Urgent Informational Notice (Without competing CTA) */}
        <Reveal delay={0.25} className="max-w-4xl mx-auto">
          <div className="p-5 sm:p-6 rounded-xl bg-[#000044]/5 border-l-4 border-[#000044] text-[#000044]">
            <h4 className="font-bold text-sm sm:text-base mb-2">
              {foundations.urgentNotice.title}
            </h4>
            <p className="reading-body text-xs sm:text-sm text-[#000044]/85 leading-relaxed">
              {foundations.urgentNotice.text}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
