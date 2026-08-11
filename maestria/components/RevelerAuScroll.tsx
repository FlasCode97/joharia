"use client";

import { useEffect } from "react";

/** Pose la classe `.vu` sur tout élément `data-reveler` qui entre à l'écran,
 *  une seule fois, puis cesse de l'observer.
 *
 *  Un seul observateur pour toute la page. Le déclenchement est unique : une
 *  animation qui se rejoue à chaque passage devient un tic nerveux.
 *
 *  En mouvement réduit, on pose `.vu` immédiatement et on n'observe rien :
 *  l'état final est là, sans transition (voir globals.css).
 */
export function RevelerAuScroll() {
  useEffect(() => {
    const cibles = document.querySelectorAll<HTMLElement>("[data-reveler]");
    if (!cibles.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cibles.forEach((c) => c.classList.add("vu"));
      return;
    }

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("vu");
          observateur.unobserve(e.target);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );

    cibles.forEach((c) => observateur.observe(c));
    return () => observateur.disconnect();
  }, []);

  return null;
}
