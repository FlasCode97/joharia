import { DeadlineBanner } from "@/components/DeadlineBanner";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Automatisation } from "@/components/Automatisation";
import { CaseDylan } from "@/components/CaseDylan";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";

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
        <Navigation />
        <Hero />
        <main id="contenu">
          <Services />
          <Automatisation />
          <CaseDylan />
          <Process />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
