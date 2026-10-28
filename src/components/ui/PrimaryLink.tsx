"use client";

import React from "react";
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
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (position) {
      trackEvent({ name: "cta_click", properties: { position } });
    }

    if (onClick) {
      onClick();
    }

    // Handle in-page navigation directly, including repeated clicks on the same hash.
    const destination = new URL(href, window.location.href);
    if (destination.pathname === window.location.pathname && destination.hash) {
      const targetElement = document.getElementById(
        decodeURIComponent(destination.hash.slice(1))
      );
      if (targetElement) {
        event.preventDefault();
        const focusTarget = targetElement.querySelector<HTMLElement>(
          "input:not([type='hidden']):not([tabindex='-1']), h2, h3"
        ) ?? targetElement;
        if (!focusTarget.matches("input, select, textarea, button, a[href]")) {
          focusTarget.setAttribute("tabindex", "-1");
        }
        focusTarget.focus({ preventScroll: true });
        targetElement.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "start",
        });
        if (window.location.hash !== destination.hash) {
          window.history.pushState(null, "", destination.hash);
        }
      }
    }
  };

  return (
    <a
      href={href}
      id={id}
      onClick={handleClick}
      className={`inline-flex items-center justify-center min-h-[48px] min-w-[48px] px-6 py-3 rounded-lg font-semibold text-base text-[#000044] bg-[#FABD04] transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FABD04] cursor-pointer shadow-sm ${className}`}
    >
      {children}
    </a>
  );
}
