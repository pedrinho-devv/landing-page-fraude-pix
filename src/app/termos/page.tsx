import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Termos de Uso | Dr. Ronney Menezes — Atendimento Jurídico",
  description:
    "Termos e condições de uso da landing page de triagem jurídica sobre fraudes bancárias via Pix.",
};

export default function TermosPage() {
  return (
    <main className="py-16 sm:py-24 bg-[#000044] text-[#FEFEFE] min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#FABD04] uppercase tracking-wider mb-8 hover:underline"
          >
            ← Voltar para a página inicial
          </Link>

          <div className="p-4 rounded-lg bg-[#FABD04]/10 border border-[#FABD04]/30 text-xs text-[#FABD04] mb-8">
            <strong>Nota de Transparência (Versão de Rascunho Editorial):</strong>{" "}
            Termos preliminares sobre o caráter meramente informativo e de triagem desta página.
          </div>

          <h1 className="fluid-h2 text-[#FEFEFE] mb-6">
            Termos de Uso
          </h1>

          <div className="space-y-6 text-sm sm:text-base text-[#FEFEFE]/85 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#FABD04] mb-2 font-[family-name:var(--font-heading)]">
                1. Natureza Informativa e Ausência de Contratação Automática
              </h2>
              <p>
                O conteúdo desta página possui caráter exclusivamente informativo e educativo. O preenchimento e envio do formulário de contato constitui apenas solicitação de triagem de viabilidade e não gera relação contratual de prestação de serviços advocatícios, representação judicial ou procuração entre as partes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FABD04] mb-2 font-[family-name:var(--font-heading)]">
                2. Inexistência de Garantia de Resultado
              </h2>
              <p>
                A análise técnica dependerá dos documentos, provas e particularidades de cada caso concreto. A realização da triagem não constitui promessa de ressarcimento financeiro ou garantia de êxito em eventuais medidas extrajudiciais ou judiciais.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FABD04] mb-2 font-[family-name:var(--font-heading)]">
                3. Veracidade das Informações Fornecidas
              </h2>
              <p>
                O usuário declara que as informações e dados informados no formulário de contato são verdadeiros e que possui poderes legítimos de representação ou gestão da empresa indicada.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FABD04] mb-2 font-[family-name:var(--font-heading)]">
                4. Comunicação Preliminar
              </h2>
              <p>
                Em situações emergenciais decorrentes de fraude recente, o usuário é orientado a comunicar imediatamente sua instituição financeira e registrar boletim de ocorrência perante as autoridades competentes, sem aguardar o retorno do contato inicial desta página.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
