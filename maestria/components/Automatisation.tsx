import { CalculTemps } from "./CalculTemps";
import { facturation, whatsappFacturation } from "@/lib/site";

/* ------------------------------------------------------------------
   TITRE DE SECTION — à trancher par Mat.
   Trois variantes retenues, chacune sur un angle différent. Pour changer,
   remplacer la constante ci-dessous par VARIANTE_A ou VARIANTE_B.
   ------------------------------------------------------------------ */
const VARIANTE_A = "La facture que vous ferez ce week-end. Depuis trois week-ends.";
const VARIANTE_B = "Le travail est fini depuis six semaines. Le virement, toujours pas.";
const VARIANTE_C = "Vous fermez à 19 h. Vous finissez à 22 h.";

const TITRE = VARIANTE_C;

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
    quoi: "Répondre aux mêmes questions sur WhatsApp",
    ou: "horaires, tarifs, adresse",
    combien: "1 à 2 heures par jour",
    detail:
      "Ce sont toujours les trois mêmes questions, et vous y répondez une par une.",
  },
  {
    quoi: "Pointer le relevé bancaire ligne à ligne",
    ou: "pour retrouver quel client a payé quoi",
    combien: "2 heures par mois",
    detail: "Un travail que personne ne vérifie et que tout le monde refait.",
  },
];

export function Automatisation() {
  return (
    <section id="automatisation" className="band">
      <div className="band-inner">
        <p className="band-label">Le temps que ça prend</p>

        <div className="band-col">
          <h2>{TITRE}</h2>

          <p>
            Le métier, vous le faites bien. Ce qui déborde, c&apos;est
            l&apos;administratif : il attend le soir, le week-end, et il revient
            toutes les semaines à l&apos;identique.
          </p>

          <p>
            Voilà ce que je constate chez les commerçants et artisans que je
            rencontre ici. Ce ne sont pas des chiffres d&apos;étude, ce sont des
            ordres de grandeur relevés en discutant :
          </p>

          <dl className="!mt-8">
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
              Prenez les devis, c&apos;est le plus facile à mesurer. Déplacez les
              deux curseurs jusqu&apos;à votre situation.
            </p>
            <CalculTemps />
          </div>
        </div>
      </div>

      {/* Échéance légale — cible du lien du bandeau. Factuel et borné :
          en 2026 il s'agit de RECEVOIR, pas d'émettre. */}
      <div className="border-t border-[var(--color-border)]">
        <div className="band-inner">
          <p className="band-label">Factures électroniques</p>
          <div className="band-col">
            <h3 className="!mt-0">
              Ce qui change le {facturation.dateReception}
            </h3>

            <p>
              À cette date, votre entreprise doit pouvoir{" "}
              <strong className="font-semibold text-[var(--color-text)]">
                recevoir
              </strong>{" "}
              les factures de vos fournisseurs au format électronique. Pas par
              mail, pas en PDF : par une plateforme agréée par l&apos;État. Cela
              vaut quelle que soit votre taille, y compris en franchise de TVA.
            </p>

            <p>
              Ce que vous devez faire d&apos;ici là tient en une ligne : choisir
              votre plateforme. C&apos;est souvent votre logiciel de compta ou
              votre expert-comptable qui la fournit — il faut vérifier, pas
              supposer.
            </p>

            <p>
              Ce que vous n&apos;avez{" "}
              <strong className="font-semibold text-[var(--color-text)]">
                pas
              </strong>{" "}
              à faire tout de suite : émettre vos propres factures en
              électronique. Pour une TPE, c&apos;est le{" "}
              {facturation.dateEmissionTpe}. D&apos;ici là, aucun client ne peut
              vous l&apos;imposer.
            </p>

            <p className="!mt-8">
              <a
                href={whatsappFacturation}
                target="_blank"
                rel="noopener noreferrer"
                className="gem-quiet"
              >
                Savoir si vous êtes prêt
                <span aria-hidden="true">→</span>
              </a>
            </p>

            <p className="!mt-6 text-[0.8125rem] text-[var(--color-text-muted)]">
              Source :{" "}
              <a
                href={facturation.source}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                impots.gouv.fr
              </a>
              . Je ne vends pas de plateforme et je ne touche rien dessus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
