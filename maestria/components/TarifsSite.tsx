import { tarifs, whatsappUrl } from "@/lib/site";

/** La page promettait « un prix ferme, pas une fourchette » sans jamais
 *  donner de chiffre, alors que la page devis affiche les siens. Même
 *  construction que celle-là, pour que les deux offres se lisent pareil. */
export function TarifsSite() {
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
                  Le site
                </span>
                <span className="mt-1 block text-[0.9375rem] text-[var(--color-text-muted)]">
                  Écrit, fabriqué, mis en ligne et hébergé. Vous recevez le lien
                  et vous pouvez l&apos;envoyer à vos clients le jour même.
                </span>
              </dt>
              <dd className="font-[family-name:var(--font-display)] text-[2rem] font-semibold tabular-nums">
                {tarifs.site}
              </dd>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[var(--color-border)] py-5">
              <dt>
                <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold">
                  Les mises à jour
                </span>
                <span className="mt-1 block text-[0.9375rem] text-[var(--color-text-muted)]">
                  Chaque mois, ce qui a bougé chez vous passe sur la page. Sans
                  engagement de durée. Facultatif.
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

          <p className="!mt-8 text-[0.9375rem]">
            L&apos;hébergement est compris dans le prix du site. Vous
            n&apos;avez pas d&apos;abonnement obligatoire pour rester en ligne.
          </p>

          <p className="!mt-8 text-[0.9375rem]">
            Un vocal entre deux clients suffit. Je réponds.
          </p>
          <p className="!mt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gem"
            >
              Écrire sur WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
