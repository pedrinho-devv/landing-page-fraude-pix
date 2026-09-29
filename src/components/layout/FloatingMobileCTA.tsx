"use client";

import React, { useEffect, useState } from "react";
import { PrimaryLink } from "@/components/ui/PrimaryLink";

export function FloatingMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroBtn = document.getElementById("hero-cta-btn");
    const formSection = document.getElementById("analise");

    if (!heroBtn || !formSection) return;

    let heroPassed = false;
    let formInView = false;

    const updateVisibility = () => {
      setIsVisible(heroPassed && !formInView);
    };

    const heroObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // When hero button is NOT intersecting (scrolled down), it passed
        heroPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        updateVisibility();
      },
      { threshold: 0 }
    );

    const formObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        formInView = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(heroBtn);
    formObserver.observe(formSection);

    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#000044]/95 backdrop-blur-md border-t border-[#FEFEFE]/15 md:hidden animate-fade-in pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
      <PrimaryLink
        href="#analise"
        position="floating"
        className="w-full text-center py-3 text-sm font-bold shadow-lg"
      >
        Solicitar análise de viabilidade
      </PrimaryLink>
    </div>
  );
}
