import Image from "next/image";
import { dylan } from "@/lib/site";

/** La seule référence livrée. Aucun superlatif, aucun chiffre de résultat :
 *  uniquement des faits vérifiables en ouvrant le lien. On assume le volume,
 *  on ne l'annonce plus comme une limite. */
export function CaseDylan() {
  return (
    <section id="realisation" className="band">
      <div className="band-inner">
        <p className="band-label">La preuve</p>

        <div className="band-col">
          <h2>Un site livré, en ligne, que vous pouvez ouvrir maintenant</h2>

          <p>
            {dylan.name} est {dylan.metier} en Guadeloupe. Son travail existait —
            deux catalogues de 26 et 14 pages, des réalisations pour la
            Médiathèque du Lamentin et Cyber-Corsaire — mais il vivait dans des
            fichiers, pas sur un lien qu&apos;on envoie.
          </p>

          <p>
            Ce qui a été fait : une page unique, en français, qui montre les
            travaux, les catalogues et les œuvres, avec le contact en bas. Pas de
            blog, pas de formulaire compliqué.
          </p>

          <p>
            Ce qu&apos;on peut vérifier : le site est en ligne depuis{" "}
            {dylan.livraison}, il est hébergé, il ne coûte rien par mois. Le lien
            s&apos;envoie par message et s&apos;ouvre sur un téléphone.
          </p>
        </div>
      </div>

      {/* Capture réelle, dans un cadre de téléphone. Dimensions déclarées :
          l'espace est réservé avant le chargement, aucun décalage. */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]">
        <div className="band-inner">
          <p className="band-label">Le site de Dylan</p>
          <div className="band-col">
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end">
              <CadreTelephone />

              <div className="min-w-0">
                <p className="!mt-0">
                  Voilà ce que ça donne sur un téléphone. C&apos;est le format
                  que regardent vos clients — pas l&apos;écran d&apos;ordinateur.
                </p>
                <p className="!mt-6">
                  <a
                    href={dylan.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gem-quiet"
                  >
                    Ouvrir le site de {dylan.name.split(" ")[0]}
                    <span aria-hidden="true">→</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ce que Mat automatise pour lui-même — contenu à fournir. */}
      <div className="border-t border-[var(--color-border)]">
        <div className="band-inner">
          <p className="band-label">Chez moi</p>
          <div className="band-col">
            <h3 className="!mt-0">Ce que j&apos;ai automatisé pour moi</h3>
            <p>
              Je ne vends pas une méthode que je n&apos;applique pas. Voilà ce
              qui tourne tout seul de mon côté, et ce que ça remplace.
            </p>

            <dl className="!mt-8">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="border-t border-[var(--color-border)] py-5 first:border-t-0 first:pt-0"
                >
                  <dt className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold">
                    {"{{À CONFIRMER PAR MAT}}"} — automatisation {n}
                  </dt>
                  <dd className="mt-2 text-[var(--color-text-muted)]">
                    Avant : {"{{À CONFIRMER PAR MAT}}"}. Maintenant :{" "}
                    {"{{À CONFIRMER PAR MAT}}"}.
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Cadre de téléphone en CSS pur : une bordure épaisse, des coins arrondis.
 *  Pas d'image de mockup à télécharger, pas de dépendance. */
function CadreTelephone() {
  return (
    <div
      aria-hidden={false}
      className="shrink-0 rounded-[1.75rem] border-[6px] border-[var(--color-text)] bg-[var(--color-text)] shadow-[0_18px_40px_-24px_rgba(22,21,15,0.55)]"
      style={{ width: 208 }}
    >
      <Image
        src={dylan.capture}
        alt={`Le site de ${dylan.name} affiché sur un téléphone`}
        width={dylan.captureLargeur}
        height={dylan.captureHauteur}
        loading="lazy"
        sizes="208px"
        className="block h-auto w-full rounded-[1.35rem]"
      />
    </div>
  );
}
