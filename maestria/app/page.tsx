import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { PhotoBand } from "@/components/PhotoBand";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="relative w-full max-w-full overflow-x-hidden">
      <Navigation />
      <Hero />
      <Projects />
      <About />
      <PhotoBand />
      <Contact />
      <SiteFooter />
    </main>
  );
}
