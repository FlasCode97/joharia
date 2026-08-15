import Image from "next/image";
import { site, asset } from "@/lib/site";

/** Un patron de TPE achète à une personne, pas à une marque. Cette section
 *  répond à la question qu'il se pose vraiment : qui décroche quand ça casse.
 *
 *  ⚠️ La photo est un emplacement vide tant que Mat n'a pas fourni la sienne.
 *  Aucune banque d'images, aucune illustration, aucun visage généré : un carré
 *  gris nommé est plus honnête qu'un faux visage. */
const PHOTO = {
  src: "/mat.webp",
  largeur: 480,
  hauteur: 600,
} as const;

/** Passer à true le jour où public/mat.webp existe. */
const PHOTO_FOURNIE = false;

export function QuiEnFace() {
  return (
    <section id="qui-en-face" className="band">
      <div className="band-inner">
        <p className="band-label">Qui vous avez en face</p>

        <div className="band-col">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            <Portrait />

            <div className="min-w-0">
              <h2 className="!mt-0">Qui vous avez en face</h2>

              <p className="!mt-4">
                Je m&apos;appelle Mathis Flason. Je travaille seul, depuis la
                Guadeloupe, et je m&apos;occupe de la paperasse répétitive des
                petites entreprises d&apos;ici.
              </p>

              <p className="!mt-4 !text-[var(--color-text)]">
                Quand vous écrivez, c&apos;est moi qui réponds. Quand quelque
                chose casse, c&apos;est moi qui le répare. Il n&apos;y a pas de
                service client, pas de numéro de dossier, pas de commercial qui
                passe la main à quelqu&apos;un d&apos;autre.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  /* Dimensions déclarées des deux côtés : la place est réservée avant le
     chargement, donc aucun décalage, photo fournie ou non. */
  const cadre =
    "shrink-0 overflow-hidden rounded-[1.5rem] border border-[var(--color-border)]";

  if (!PHOTO_FOURNIE) {
    return (
      <div
        className={`${cadre} flex items-center justify-center bg-[var(--color-surface-pressed)]`}
        style={{ width: 176, aspectRatio: `${PHOTO.largeur} / ${PHOTO.hauteur}` }}
      >
        <span className="px-4 text-center text-[0.8125rem] text-[var(--color-text-muted)]">
          Photo de Mat
          <span className="mt-1 block text-[0.75rem]">à fournir</span>
        </span>
      </div>
    );
  }

  return (
    <div className={cadre} style={{ width: 176 }}>
      <Image
        src={asset(PHOTO.src)}
        alt={`Mathis Flason, qui répond quand vous écrivez à ${site.name}`}
        width={PHOTO.largeur}
        height={PHOTO.hauteur}
        loading="lazy"
        sizes="176px"
        className="block h-auto w-full"
      />
    </div>
  );
}
