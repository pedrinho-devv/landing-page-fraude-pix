import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { landingContent } from "@/content/landing";

export function ProfessionalIdentity() {
  const { professional } = landingContent;

  return (
    <section className="py-14 sm:py-20 bg-[#000044] text-[#FEFEFE] border-b border-[#FEFEFE]/10">
      <Container>
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Foto Profissional Real */}
          <Reveal>
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#FABD04] shadow-2xl mb-6 ring-4 ring-[#FABD04]/20">
              <Image
                src="/images/ronney-menezes-portrait.webp"
                alt={professional.name}
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover object-top"
                priority={false}
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="fluid-h2 text-[#FEFEFE] mb-2 font-bold">
              {professional.name}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm sm:text-base text-[#FEFEFE]/85 max-w-xl mx-auto mb-3">
              {professional.description}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="inline-flex items-center gap-2 text-xs text-[#FEFEFE]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FABD04]" />
              <span>{professional.location}</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
