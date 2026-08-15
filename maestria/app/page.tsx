import type { Metadata } from "next";
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
        <Navigation page="auto" />
        <Hero />
        {/* Les démonstrations passent juste après le hero : c'est le seul
            actif de preuve du site, il doit être touchable sans effort.
            La facturation électronique descend tout en bas, après le
            contact : en accroche, elle déclenchait « j'ai un comptable »
            avant que l'offre soit lue. */}
        <main id="contenu">
          <Demonstrations />
          <Automatisation />
          <ChezMoi />
          <Tarifs />
          <ProcessAuto />
          <Contact />
          <Facturation />
        </main>
        <SiteFooter />
        <BarreWhatsApp />
      </div>

      <PauseHorsChamp />
      <RevelerAuScroll />
    </>
  );
}
