import type { Metadata } from "next";
import { BarreWhatsApp } from "@/components/BarreWhatsApp";
import { PauseHorsChamp } from "@/components/PauseHorsChamp";
import { RevelerAuScroll } from "@/components/RevelerAuScroll";
import { Navigation } from "@/components/Navigation";
import { HeroSites } from "@/components/HeroSites";
import { Services } from "@/components/Services";
import { Realisations } from "@/components/Realisations";
import { FabriquerDabord } from "@/components/FabriquerDabord";
import { TarifsSite } from "@/components/TarifsSite";
import { ProcessSite } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Johària, sites internet pour les commerces de Guadeloupe",
  description:
    "Une page qui dit qui vous êtes, où vous êtes et combien ça coûte. Livrée, hébergée, rapide sur téléphone. Deux sites livrés, visibles en ligne.",
};

export default function SitesWeb() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--color-surface)] focus:px-4 focus:py-2 focus:text-[var(--color-text)]"
      >
        Aller au contenu
      </a>
      <div id="top" className="relative w-full overflow-x-hidden">
        <Navigation page="sites" />
        <HeroSites />
        <main id="contenu">
          <Services />
          <Realisations />
          <FabriquerDabord />
          <TarifsSite />
          <ProcessSite />
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
