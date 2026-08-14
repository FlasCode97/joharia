"use client";

import { useState } from "react";

/* Démonstration manipulable : le visiteur écrit comme un client écrirait,
   et le devis se compose sous ses yeux.

   C'est la seule preuve d'automatisation disponible aujourd'hui — aucun
   client n'en a encore commandé une. Plutôt que de raconter, on fait toucher.

   Tout tourne dans le navigateur : aucun serveur, aucune API, aucune donnée
   qui sort. Les montants sont des exemples, la page le dit explicitement. */

type Ligne = { libelle: string; montant: number };

const REGLES: { mots: string[]; lignes: Ligne[] }[] = [
  {
    mots: ["vidange", "huile", "5w40", "5w30"],
    lignes: [
      { libelle: "Huile moteur 5W40 (5 L)", montant: 68 },
      { libelle: "Filtre à huile", montant: 14 },
      { libelle: "Main d'œuvre (0,5 h)", montant: 35 },
    ],
  },
  {
    mots: ["frein", "plaquette", "disque", "grince"],
    lignes: [
      { libelle: "Plaquettes de frein avant", montant: 78 },
      { libelle: "Main d'œuvre (1 h)", montant: 70 },
    ],
  },
  {
    mots: ["pneu", "crevé", "creve", "roue"],
    lignes: [
      { libelle: "Pneu 195/65 R15 (2 unités)", montant: 164 },
      { libelle: "Montage et équilibrage", montant: 40 },
    ],
  },
  {
    mots: ["révision", "revision", "entretien", "contrôle", "controle"],
    lignes: [
      { libelle: "Révision complète (30 points)", montant: 145 },
      { libelle: "Filtre à air et filtre habitacle", montant: 46 },
      { libelle: "Main d'œuvre (1,5 h)", montant: 105 },
    ],
  },
  {
    mots: ["clim", "climatisation", "froid"],
    lignes: [
      { libelle: "Recharge climatisation", montant: 89 },
      { libelle: "Contrôle d'étanchéité", montant: 25 },
    ],
  },
];

const PAR_DEFAUT: Ligne[] = [
  { libelle: "Diagnostic atelier (1 h)", montant: 45 },
];

/* TVA de Guadeloupe : 8,5 % au taux normal, et non 20 % comme en métropole.
   Un garagiste d'ici le remarque immédiatement. */
const TVA = 0.085;

const EXEMPLES = [
  "Bonjour, combien pour une vidange sur Clio 4 ?",
  "Mes freins grincent à l'avant, vous prenez combien ?",
  "Il me faut deux pneus avant, c'est quel prix ?",
];

function lignesPour(message: string): Ligne[] {
  const m = message.toLowerCase();
  const trouvees = REGLES.filter((r) => r.mots.some((mot) => m.includes(mot)));
  if (!trouvees.length) return PAR_DEFAUT;
  return trouvees.flatMap((r) => r.lignes);
}

function euros(n: number) {
  return n.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d),)/g, " ");
}

export function DemoDevis() {
  const [message, setMessage] = useState(EXEMPLES[0]);
  const [envoye, setEnvoye] = useState(message);

  const lignes = lignesPour(envoye);
  const ht = lignes.reduce((s, l) => s + l.montant, 0);
  const tva = ht * TVA;

  return (
    <div className="mt-8">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {/* Côté client : le message tel qu'il arrive */}
        <div>
          <p className="text-[0.8125rem] text-[var(--color-text-muted)]">
            Le message du client, sur WhatsApp
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEnvoye(message);
            }}
            className="mt-3"
          >
            <label htmlFor="demo-message" className="sr-only">
              Écrivez la demande d&apos;un client
            </label>
            <textarea
              id="demo-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-3 text-[0.9375rem] text-[var(--color-text)] focus:border-[var(--color-action)] focus:outline-none"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {EXEMPLES.map((ex, i) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setMessage(ex);
                    setEnvoye(ex);
                  }}
                  className="tap rounded-full border border-[var(--color-border-strong)] px-3 py-1.5 text-[0.8125rem] text-[var(--color-text-muted)] transition-colors duration-150 hover:border-[var(--color-action)] hover:text-[var(--color-text)] active:opacity-70"
                >
                  Exemple {i + 1}
                </button>
              ))}
            </div>

            <p className="mt-4">
              <button type="submit" className="gem-quiet">
                Traiter la demande
                <span aria-hidden="true">→</span>
              </button>
            </p>
          </form>
        </div>

        {/* Côté atelier : ce qui sort */}
        <div>
          <p className="text-[0.8125rem] text-[var(--color-text-muted)]">
            Le devis, prêt à envoyer
          </p>

          <div
            aria-live="polite"
            className="mt-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <table className="w-full text-[0.9375rem]">
              <caption className="sr-only">
                Devis calculé à partir de la demande
              </caption>
              <tbody>
                {lignes.map((l) => (
                  <tr key={l.libelle} className="align-baseline">
                    <td className="py-1.5 pr-4 text-[var(--color-text-muted)]">
                      {l.libelle}
                    </td>
                    <td className="py-1.5 text-right tabular-nums text-[var(--color-text)]">
                      {euros(l.montant)}&nbsp;€
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="align-baseline">
                  <td className="border-t border-[var(--color-border)] pt-3 pr-4 text-[var(--color-text-muted)]">
                    TVA 8,5 %
                  </td>
                  <td className="border-t border-[var(--color-border)] pt-3 text-right tabular-nums text-[var(--color-text-muted)]">
                    {euros(tva)}&nbsp;€
                  </td>
                </tr>
                <tr className="align-baseline">
                  <td className="pt-2 pr-4 font-[family-name:var(--font-display)] text-[1.15rem] font-semibold">
                    Total
                  </td>
                  <td className="pt-2 text-right font-[family-name:var(--font-display)] text-[1.35rem] font-semibold tabular-nums">
                    {euros(ht + tva)}&nbsp;€
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="mt-3 text-[0.8125rem] text-[var(--color-text-muted)]">
            Montants d&apos;exemple, pas un tarif réel. La TVA à 8,5 % est
            celle de Guadeloupe.
          </p>
        </div>
      </div>
    </div>
  );
}
