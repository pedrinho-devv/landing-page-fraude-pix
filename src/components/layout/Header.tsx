"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { landingContent } from "@/content/landing";

export function Header() {
  const { brandName, ctaLabel, ctaHref } = landingContent.header;

  return (
    <>
      {/* Skip to main content link for screen readers and keyboard users */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#FABD04] focus:text-[#000044] focus:font-bold focus:shadow-md"
      >
        Pular para o conteúdo principal
      </a>

      <header className="sticky top-0 z-40 w-full bg-[#000044]/95 backdrop-blur-sm border-b border-[#FEFEFE]/15 transition-colors">
        <Container>
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Logo oficial */}
            <Link
              href="/"
              className="flex items-center hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#FABD04] rounded px-1 -ml-1 transition-opacity shrink min-w-0"
            >
              <Image
                src="/images/logo-ronney-menezes.png"
                alt={brandName}
                width={200}
                height={48}
                priority
                className="h-7 sm:h-9 md:h-10 w-auto max-w-[140px] sm:max-w-none object-contain"
              />
            </Link>

            {/* Direct CTA */}
            <PrimaryLink
              href={ctaHref}
              position="header"
              className="text-xs sm:text-sm px-3.5 py-2 sm:px-5 sm:py-2.5 min-h-[44px] shrink-0 whitespace-nowrap font-bold"
            >
              {ctaLabel}
            </PrimaryLink>
          </div>
        </Container>
      </header>
    </>
  );
}
