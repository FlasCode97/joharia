import type { Metadata } from "next";
import { DeadlineBanner } from "@/components/DeadlineBanner";
import { BarreWhatsApp } from "@/components/BarreWhatsApp";
import { PauseHorsChamp } from "@/components/PauseHorsChamp";
import { RevelerAuScroll } from "@/components/RevelerAuScroll";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Automatisation } from "@/components/Automatisation";
import { Demonstrations } from "@/components/Demonstrations";
import { ChezMoi } from "@/components/ChezMoi";
import { Tarifs } from "@/components/Tarifs";
import { ProcessAuto } from "@/components/Process";
import { Facturation } from "@/components/Facturation";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Johària, automatiser les tâches qui vous gardent au bureau",
  description:
    "Devis, relances, messages, factures : je fabrique des machines qui les font à votre place. Pour les commerces et artisans de Guadeloupe.",
};

export default function Home() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--color-surface)] focus:px-4 focus:py-2 focus:text-[var(--color-text)]"
      >
        Aller au contenu
      </a>
      <div id="top" className="relative w-full overflow-x-hidden">
        <DeadlineBanner />
        <Navigation page="auto" />
        <Hero />
        <main id="contenu">
          <Automatisation />
          <Demonstrations />
          <ChezMoi />
          <Tarifs />
          <ProcessAuto />
          <Facturation />
          <Contact />
        </main>
        <SiteFooter />
        <BarreWhatsApp />
      </div>

      <PauseHorsChamp />
      <RevelerAuScroll />
    </>
  );
}
