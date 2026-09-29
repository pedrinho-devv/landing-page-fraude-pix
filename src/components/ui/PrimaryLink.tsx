"use client";

import React from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface PrimaryLinkProps {
  href: string;
  children: React.ReactNode;
  position?: "header" | "hero" | "audience" | "floating";
  className?: string;
  onClick?: () => void;
  id?: string;
}

export function PrimaryLink({
  href,
  children,
  position,
  className = "",
  onClick,
  id,
}: PrimaryLinkProps) {
  const handleClick = () => {
    if (position) {
      trackEvent({ name: "cta_click", properties: { position } });
    }

    if (onClick) {
      onClick();
    }

    // Smooth focus if targeting anchor
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Allow default anchor navigation or enhanced focus
        const heading = targetElement.querySelector("h2, h3, [tabindex]");
        if (heading instanceof HTMLElement) {
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
        }
      }
    }
  };

  return (
    <Link
      href={href}
      id={id}
      onClick={handleClick}
      className={`inline-flex items-center justify-center min-h-[48px] min-w-[48px] px-6 py-3 rounded-lg font-semibold text-base text-[#000044] bg-[#FABD04] transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FABD04] cursor-pointer shadow-sm ${className}`}
    >
      {children}
    </Link>
  );
}
