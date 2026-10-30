import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Política de Privacidade | Dr. Ronney Menezes — Atendimento Jurídico",
  description:
    "Diretrizes de privacidade e tratamento de dados para a solicitação de análise jurídica sobre fraudes via Pix.",
};

export default function PrivacidadePage() {
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
            Este documento descreve as práticas preliminares de tratamento de dados para a triagem inicial e deverá ser revisado e homologado pelo responsável profissional antes do lançamento comercial definitivo.
          </div>

          <h1 className="fluid-h2 text-[#FEFEFE] mb-6">
            Política de Privacidade
          </h1>

          <div className="space-y-6 text-sm sm:text-base text-[#FEFEFE]/85 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#FABD04] mb-2 font-[family-name:var(--font-heading)]">
                1. Finalidade do Tratamento de Dados
              </h2>
              <p>
                Os dados coletados por meio do formulário de contato (nome, nome da empresa, telefone/WhatsApp, e-mail opcional e respostas do questionário preliminar) destinam-se exclusivamente à triagem e avaliação técnica de viabilidade jurídica do caso pelo escritório do Dr. Ronney Menezes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FABD04] mb-2 font-[family-name:var(--font-heading)]">
                2. Base Legal (LGPD)
              </h2>
              <p>
                O tratamento das informações tem por base o consentimento do titular e os procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do próprio titular (art. 7º, incisos I e V, da Lei Geral de Proteção de Dados — Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FABD04] mb-2 font-[family-name:var(--font-heading)]">
                3. Envio do Formulário e Sigilo Profissional
              </h2>
              <p>
                O formulário utiliza o Web3Forms para encaminhar os dados informados ao e-mail vinculado ao atendimento do escritório. As informações transmitidas são tratadas sob dever de sigilo ético e profissional. Não comercializamos nem compartilhamos dados pessoais com terceiros para fins de marketing ou publicidade comportamental.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FABD04] mb-2 font-[family-name:var(--font-heading)]">
                4. Segurança e Retenção
              </h2>
              <p>
                Adotamos medidas técnicas de segurança para proteger as comunicações. Os dados de triagem que não evoluírem para contratação formal de serviços serão descartados ou mantidos apenas pelo período estritamente necessário para cumprimento de obrigações legais ou regulatórias.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FABD04] mb-2 font-[family-name:var(--font-heading)]">
                5. Direitos do Titular
              </h2>
              <p>
                Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento a confirmação de existência do tratamento, acesso aos dados, correção de dados incompletos ou a eliminação dos dados tratados com consentimento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FABD04] mb-2 font-[family-name:var(--font-heading)]">
                6. Canal de Atendimento
              </h2>
              <p>
                Para exercer seus direitos de titular ou esclarecer dúvidas sobre esta Política, entre em contato diretamente pelo canal oficial informado no retorno de seu atendimento.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
