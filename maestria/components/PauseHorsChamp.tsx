"use client";

import { useEffect } from "react";

/** Un seul IntersectionObserver pour toute la page : chaque élément portant
 *  `data-pause-hors-champ` reçoit la classe `.hors-champ` dès qu'il quitte
 *  l'écran, ce qui met ses animations CSS en pause.
 *
 *  Raison d'être : le site promet de s'ouvrir vite sur réseau moyen. Une
 *  boucle de rendu qui tourne en permanence pendant qu'on lit le bas de page
 *  contredirait cette promesse et viderait la batterie pour rien.
 */
export function PauseHorsChamp() {
  useEffect(() => {
    const cibles = document.querySelectorAll<HTMLElement>(
      "[data-pause-hors-champ]"
    );
    if (!cibles.length) return;

    // Rien à mettre en pause si l'utilisateur a déjà tout désactivé.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          e.target.classList.toggle("hors-champ", !e.isIntersecting);
        }
      },
      { rootMargin: "120px" }
    );

    cibles.forEach((c) => observateur.observe(c));
    return () => observateur.disconnect();
  }, []);

  return null;
}
