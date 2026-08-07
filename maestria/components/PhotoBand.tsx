"use client";

import { useAdaptiveSection } from "./useAdaptiveSection";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

/** Bande galerie entre deux sections — emplacements photo à remplacer plus tard. */
export function PhotoBand() {
  const { ref, style } = useAdaptiveSection<HTMLElement>();
  return (
    <section
      ref={ref}
      style={style}
      aria-label="Galerie photo"
      className="relative py-10 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 md:grid-cols-4 md:gap-6 md:px-16">
        <PhotoPlaceholder aspect="3 / 4" />
        <PhotoPlaceholder aspect="3 / 4" className="md:translate-y-10" />
        <PhotoPlaceholder aspect="3 / 4" />
        <PhotoPlaceholder aspect="3 / 4" className="md:translate-y-10" />
      </div>
    </section>
  );
}
