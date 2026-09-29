import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { landingContent } from "@/content/landing";

export function Footer() {
  const { footer } = landingContent;

  return (
    <footer className="py-12 sm:py-16 bg-[#000044] text-[#FEFEFE] border-t border-[#FEFEFE]/15">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-[#FEFEFE]/10">
          <div>
            <span className="text-xl font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider text-[#FEFEFE] block mb-1">
              {footer.name}
            </span>
            <p className="text-xs text-[#FEFEFE]/65">
              Atendimento Jurídico · {footer.location}
            </p>
          </div>

          <nav aria-label="Links institucionais e termos" className="flex flex-wrap items-center gap-6">
            {footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs sm:text-sm text-[#FEFEFE]/75 hover:text-[#FABD04] transition-colors focus-visible:outline-2 focus-visible:outline-[#FABD04] rounded"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[#FEFEFE]/50">
          <p className="reading-body text-xs text-[#FEFEFE]/60">
            {footer.disclaimer}
          </p>
          <p className="shrink-0">
            © {footer.year} {footer.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
