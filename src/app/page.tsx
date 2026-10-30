import React from "react";
import { Hero } from "@/components/sections/Hero";
import { AnalysisProcess } from "@/components/sections/AnalysisProcess";
import { AudienceCriteria } from "@/components/sections/AudienceCriteria";
import { LegalFoundations } from "@/components/sections/LegalFoundations";
import { ProfessionalIdentity } from "@/components/sections/ProfessionalIdentity";


export default function Home() {
  const vslUrl = process.env.NEXT_PUBLIC_VSL_URL;
  const vslPoster = process.env.NEXT_PUBLIC_VSL_POSTER;

  return (
    <main id="conteudo-principal" className="flex flex-col w-full">
      <Hero videoUrl={vslUrl} posterUrl={vslPoster} />
      <AnalysisProcess />
      <AudienceCriteria />
      <LegalFoundations />
      <ProfessionalIdentity />

    </main>
  );
}
