"use client";

import { useState } from "react";
import { facturation } from "@/lib/site";

/** Bandeau d'échéance. Factuel, pas alarmiste : une date, une conséquence,
 *  un lien. Pas de compte à rebours, pas de rouge, pas de point d'exclamation.
 *
 *  Anti layout-shift : le masquage au chargement est fait par le script inline
 *  de `app/layout.tsx` (attribut sur <html> + règle CSS), donc AVANT peinture.
 *  Ce composant ne gère que la fermeture au clic, une fois la page vivante.
 */
export function DeadlineBanner() {
  const [ferme, setFerme] = useState(false);

  const fermer = () => {
    setFerme(true);
    document.documentElement.setAttribute("data-echeance", "masquee");
    try {
      localStorage.setItem("joharia:echeance-facture", "masquee");
    } catch {
      // navigation privée ou stockage refusé : on ferme pour la session, c'est tout
    }
  };

  if (ferme) return null;

  return (
    <aside
      id="bandeau-echeance"
      aria-label="Échéance facturation électronique"
      className="on-dark border-b border-white/10 bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse-muted)]"
    >
      <div className="mx-auto flex max-w-[78rem] items-start gap-4 px-6 py-2.5 md:items-center md:px-12">
        <p className="min-w-0 flex-1 text-[0.8125rem] leading-snug text-pretty">
          <span className="text-[var(--color-text-inverse)]">
            {facturation.dateReception}
          </span>{" "}
          : vous devrez pouvoir recevoir vos factures au format électronique.{" "}
          <a
            href="#facture-electronique"
            className="tap whitespace-nowrap text-[var(--color-action-inverse)] underline underline-offset-2 hover:decoration-2 active:opacity-70"
          >
            Ce que ça change
          </a>
        </p>

        <button
          type="button"
          onClick={fermer}
          aria-label="Masquer ce bandeau"
          className="tap -my-2 shrink-0 justify-center px-3 py-2 text-[var(--color-text-inverse-muted)] transition-colors duration-150 hover:text-[var(--color-text-inverse)] active:opacity-70"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M1.5 1.5 12.5 12.5M12.5 1.5 1.5 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}
