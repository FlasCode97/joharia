import { tarifs, whatsappAutomatisation } from "@/lib/site";

/** Le prix est affiché. C'est rare dans ce métier, et c'est précisément ce
 *  qui rassure un patron de TPE : il sait avant d'appeler. */
export function Tarifs() {
  return (
    <section id="prix" className="band">
      <div className="band-inner">
        <p className="band-label">Ce que ça coûte</p>

        <div className="band-col">
          <h2>Le prix est écrit. Vous n&apos;avez pas à le demander.</h2>

          <dl className="!mt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[var(--color-border)] py-5 first:border-t-0 first:pt-0">
              <dt>
                <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold">
                  Installation
                </span>
                <span className="mt-1 block text-[0.9375rem] text-[var(--color-text-muted)]">
                  Une automatisation, décrite avec vous, construite, testée sur
                  vos vrais dossiers et mise en route. Livrée en{" "}
                  {tarifs.delai} au maximum.
                </span>
              </dt>
              <dd className="font-[family-name:var(--font-display)] text-[2rem] font-semibold tabular-nums">
                {tarifs.installation}&nbsp;€
              </dd>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[var(--color-border)] py-5">
              <dt>
                <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold">
                  Surveillance
                </span>
                <span className="mt-1 block text-[0.9375rem] text-[var(--color-text-muted)]">
                  Je vérifie que ça tourne, je corrige quand ça casse,
                  j&apos;ajuste quand votre activité change. Sans engagement de
                  durée.
                </span>
              </dt>
              <dd className="font-[family-name:var(--font-display)] text-[2rem] font-semibold tabular-nums">
                {tarifs.mensuel}&nbsp;€
                <span className="ml-1 font-[family-name:var(--font-body)] text-[0.8125rem] font-normal text-[var(--color-text-muted)]">
                  par mois
                </span>
              </dd>
            </div>
          </dl>

          <p className="!mt-8 font-[family-name:var(--font-display)] text-[1.3rem] leading-snug !text-[var(--color-text)]">
            Reprenez le calcul plus haut. Si vous perdez 130 heures par an,
            l&apos;installation est remboursée avant la fin du quatrième mois.
          </p>

          <p className="!mt-6 text-[0.9375rem]">
            La surveillance n&apos;est pas un supplément de confort. Une
            automatisation qui s&apos;arrête sans prévenir est pire que pas
            d&apos;automatisation du tout : vous croyez que c&apos;est fait, et
            ça ne l&apos;est pas.
          </p>

          <p className="!mt-8">
            <a
              href={whatsappAutomatisation}
              target="_blank"
              rel="noopener noreferrer"
              className="gem"
            >
              Savoir ce que ça donnerait chez vous
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
