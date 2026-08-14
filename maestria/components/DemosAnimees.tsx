/* Deux démonstrations animées en CSS pure — aucun JavaScript, aucune
   dépendance. Elles se mettent en pause hors viewport grâce à
   `data-pause-hors-champ`, et s'affichent à l'état final en mouvement réduit.

   Elles montrent le déroulé au lieu de le décrire : c'est la différence entre
   « je fais des relances automatiques » et voir la relance partir toute seule. */

const etapesRelance = [
  { quand: "Lundi", quoi: "Vous envoyez le devis pour le séjour.", auto: false },
  { quand: "Jeudi", quoi: "Toujours pas de réponse.", auto: false },
  {
    quand: "Jeudi, 18 h",
    quoi: "Un message de rappel part tout seul, poliment.",
    auto: true,
  },
  { quand: "Vendredi", quoi: "« C'est bon pour nous, on réserve. »", auto: false },
];

export function DemoRelance() {
  return (
    <div data-pause-hors-champ className="sequence mt-6">
      <ol className="list-none">
        {etapesRelance.map((e, i) => (
          <li
            key={e.quand + e.quoi}
            className={`sequence-item sequence-item-${i + 1} flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-[var(--color-border)] py-3 first:border-t-0 first:pt-0`}
          >
            <span className="w-[5.5rem] shrink-0 text-[0.8125rem] tabular-nums text-[var(--color-text-muted)]">
              {e.quand}
            </span>
            <span
              className={
                e.auto
                  ? "font-medium text-[var(--color-action)]"
                  : "text-[var(--color-text-muted)]"
              }
            >
              {e.quoi}
            </span>
            {e.auto && (
              <span className="rounded-full border border-[var(--color-action)] px-2 py-0.5 text-[0.6875rem] text-[var(--color-action)]">
                automatique
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

const messages = [
  { objet: "Facture Sogedis — août", vers: "Compta" },
  { objet: "Vous avez de la place samedi soir ?", vers: "À répondre" },
  { objet: "Newsletter fournisseur boissons", vers: "Archive" },
  { objet: "Relance impayé table 12", vers: "Compta" },
];

export function DemoTri() {
  return (
    <div data-pause-hors-champ className="sequence mt-6">
      <ul className="list-none">
        {messages.map((m, i) => (
          <li
            key={m.objet}
            className={`sequence-item sequence-item-${i + 1} flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-[var(--color-border)] py-3 first:border-t-0 first:pt-0`}
          >
            <span className="min-w-0 text-[var(--color-text-muted)]">
              {m.objet}
            </span>
            <span className="sequence-etiquette shrink-0 rounded-full bg-[var(--color-surface-pressed)] px-3 py-1 text-[0.8125rem] text-[var(--color-text)]">
              {m.vers}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
