import Image from "next/image";
import { realisations, CAPTURE_L, CAPTURE_H } from "@/lib/site";

/** Les sites livrés et payés. Aucun superlatif, aucun chiffre de résultat :
 *  uniquement ce qu'on peut vérifier en ouvrant le lien. */
export function Realisations() {
  return (
    <section id="realisations" className="band">
      <div className="band-inner">
        <p className="band-label">Les réalisations</p>
        <div className="band-col">
          <h2>Deux sites livrés, en ligne, que vous pouvez ouvrir maintenant</h2>
          <p>
            Il y en a deux. Je les montre en entier plutôt que d&apos;en
            promettre dix.
          </p>
        </div>
      </div>

      {realisations.map((r, i) => (
        <div
          key={r.slug}
          className={
            i % 2 === 0
              ? "border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]"
              : "border-t border-[var(--color-border)]"
          }
        >
          <div className="band-inner">
            <p className="band-label">{r.nom}</p>
            <div className="band-col">
              <div className="flex flex-col items-start gap-8 sm:flex-row">
                <CadreTelephone src={r.capture} alt={`Le site ${r.nom} sur un téléphone`} />

                <div className="min-w-0">
                  <h3 className="!mt-0">{r.nom}</h3>
                  <p className="!mt-2 !text-[var(--color-text-muted)]">
                    {r.quoi}. En ligne depuis {r.livraison}.
                  </p>

                  <ul className="!mt-5 list-none space-y-2">
                    {r.contenu.map((c) => (
                      <li
                        key={c}
                        className="flex gap-3 text-[0.9375rem] text-[var(--color-text-muted)]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-[var(--color-action)]"
                        />
                        {c}
                      </li>
                    ))}
                  </ul>

                  <p className="!mt-5 !text-[var(--color-text)]">{r.apport}</p>

                  <p className="!mt-6">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gem-quiet"
                    >
                      Ouvrir le site
                      <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/** Cadre de téléphone en CSS pur : une bordure épaisse, des coins arrondis.
 *  Pas de mockup à télécharger, pas de dépendance. */
function CadreTelephone({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="shrink-0 rounded-[1.75rem] border-[6px] border-[var(--color-text)] bg-[var(--color-text)] shadow-[0_18px_40px_-24px_rgba(22,21,15,0.55)]"
      style={{ width: 208 }}
    >
      <Image
        src={src}
        alt={alt}
        width={CAPTURE_L}
        height={CAPTURE_H}
        loading="lazy"
        sizes="208px"
        className="block h-auto w-full rounded-[1.35rem]"
      />
    </div>
  );
}
