import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { landingContent } from "@/content/landing";

export function AnalysisProcess() {
  const { process } = landingContent;

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-[#FEFEFE] text-[#000044] border-b border-[#000044]/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column (Desktop intro) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28 self-start">
            <Reveal>
              <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#000044] mb-3 py-1 px-2.5 rounded bg-[#000044]/5 border border-[#000044]/15">
                {process.label}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="fluid-h2 text-[#000044] mb-5">
                {process.title}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="reading-body text-[#000044]/80 text-base sm:text-lg mb-6">
                {process.introduction}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-4 rounded-lg bg-[#000044]/5 border-l-4 border-[#FABD04] text-xs sm:text-sm text-[#000044]/85 leading-relaxed">
                {process.postscript}
              </div>
            </Reveal>
          </div>

          {/* Right Column (Steps 1 to 6) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#000044]/15">
            {process.steps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 0.05}
                className="py-6 sm:py-8 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-5 sm:gap-6">
                  {/* Step Number in brand-yellow */}
                  <span className="font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-3xl text-[#000044] bg-[#FABD04] px-2.5 py-1 rounded-md shrink-0 shadow-xs">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#000044] mb-2">
                      {step.title}
                    </h3>
                    <p className="reading-body text-sm sm:text-base text-[#000044]/80">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
