import { CalculTemps } from "./CalculTemps";

/** Relevés de terrain de Mat, présentés comme tels. Ce ne sont pas les
 *  résultats d'une étude et la page ne doit jamais le laisser croire. */
const taches = [
  {
    quoi: "Refaire un devis ou une facture à la main",
    ou: "dans Word, ou sur le carnet",
    combien: "3 à 6 heures par semaine",
    detail:
      "Sans compter les erreurs de TVA, qu'on ne voit qu'au moment de la déclaration.",
  },
  {
    quoi: "Répondre aux mêmes questions",
    ou: "horaires, tarifs, adresse, disponibilité",
    combien: "1 à 2 heures par jour",
    detail:
      "Ce sont toujours les trois mêmes questions, et vous y répondez une par une.",
  },
  {
    quoi: "Pointer le relevé bancaire ligne à ligne",
    ou: "pour retrouver qui a payé quoi",
    combien: "2 heures par mois",
    detail: "Un travail que personne ne vérifie et que tout le monde refait.",
  },
];

export function Automatisation() {
  return (
    <section id="le-probleme" className="band">
      <div className="band-inner">
        <p className="band-label">Le temps que ça prend</p>

        <div className="band-col">
          <h2>
            Le problème n&apos;est pas votre travail. C&apos;est tout ce
            qu&apos;il y a autour.
          </h2>

          <p>
            Dans un garage où je suis passé, les factures s&apos;empilent sur le
            bureau de la secrétaire. Elles ne sont pas en retard : elles
            attendent simplement qu&apos;une personne les reprenne une par une.
            C&apos;est ça, la tâche qui déborde — elle n&apos;est jamais
            urgente, et elle revient tous les jours.
          </p>

          <p>
            Voilà ce que je constate chez les commerçants et artisans que je
            rencontre ici. Ce ne sont pas des chiffres d&apos;étude, ce sont des
            ordres de grandeur relevés en discutant :
          </p>

          <dl data-reveler className="reveal !mt-8">
            {taches.map((t) => (
              <div
                key={t.quoi}
                className="border-t border-[var(--color-border)] py-5 first:border-t-0 first:pt-0"
              >
                <dt className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                  <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold leading-snug">
                    {t.quoi}{" "}
                    <span className="font-[family-name:var(--font-body)] text-[0.9rem] font-normal text-[var(--color-text-muted)]">
                      — {t.ou}
                    </span>
                  </span>
                  <span className="shrink-0 font-[family-name:var(--font-display)] text-[1.05rem] font-semibold tabular-nums text-[var(--color-action)]">
                    {t.combien}
                  </span>
                </dt>
                <dd className="mt-2 text-[var(--color-text-muted)]">
                  {t.detail}
                </dd>
              </div>
            ))}
          </dl>

          <p className="!mt-8 font-[family-name:var(--font-display)] text-[1.3rem] leading-snug !text-[var(--color-text)]">
            Et les impayés ne vous coûtent pas du temps. Ils vous coûtent de
            l&apos;argent qui existe, qui vous appartient, et qui dort chez
            quelqu&apos;un d&apos;autre parce que personne n&apos;a relancé.
          </p>
        </div>
      </div>

      {/* Le calculateur — le visiteur chiffre son propre problème. */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]">
        <div className="band-inner">
          <p className="band-label">Comptez vous-même</p>
          <div className="band-col">
            <h3 className="!mt-0">Un seul de ces postes, mis bout à bout</h3>
            <p>
              Prenez les devis, c&apos;est le plus facile à mesurer. Déplacez
              les deux curseurs jusqu&apos;à votre situation.
            </p>
            <CalculTemps />
          </div>
        </div>
      </div>
    </section>
  );
}
