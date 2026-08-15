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
  return <Chronologie etapes={etapesRelance} />;
}

/* Chronologie d'un impayé. C'est le poste où l'argent se perd vraiment :
   pas au devis, à l'échéance, quand personne n'a rappelé. */
const etapesImpaye = [
  { quand: "Jour 0", quoi: "Facture envoyée, échéance à 30 jours.", auto: false },
  { quand: "Jour 31", quoi: "Rien. Personne n'a eu le temps d'appeler.", auto: false },
  {
    quand: "Jour 32",
    quoi: "Un rappel part tout seul, poliment, la facture en pièce jointe.",
    auto: true,
  },
  { quand: "Jour 38", quoi: "Deuxième rappel, un ton plus ferme.", auto: true },
  { quand: "Jour 40", quoi: "Virement reçu.", auto: false },
];

export function DemoImpaye() {
  return <Chronologie etapes={etapesImpaye} />;
}

/** Chronologie datée, partagée par les démonstrations gîte et BTP. Chaque
 *  ligne apparaît à son tour, en boucle lente, et les étapes machine portent
 *  un marqueur. */
function Chronologie({
  etapes,
}: {
  etapes: { quand: string; quoi: string; auto: boolean }[];
}) {
  return (
    <div data-pause-hors-champ className="sequence mt-6">
      <ol className="list-none">
        {etapes.map((e, i) => (
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
