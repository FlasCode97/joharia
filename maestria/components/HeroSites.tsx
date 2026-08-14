import Link from "next/link";
import { whatsappUrl, realisations } from "@/lib/site";

/** Hero de la page sites web. L'accroche « on vous a cherché » vient de
 *  l'ancienne page unique : elle parle de visibilité, donc elle appartient
 *  ici et non sur la page automatisation.
 *
 *  Pas de chaîne animée : sur cette page, la preuve, ce sont les captures
 *  des deux sites livrés, plus bas. */
export function HeroSites() {
  return (
    <section className="on-dark relative bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]">
      <div className="mx-auto max-w-[78rem] px-6 pb-14 pt-10 md:px-12 md:pb-20 md:pt-16">
        <div className="max-w-[38rem]">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,7vw,4rem)] font-semibold leading-[1.03] tracking-[-0.025em] text-balance">
            Quelqu&apos;un vous a cherché hier soir.
            <br />
            <span className="text-[var(--color-action-inverse)]">
              Il ne vous a pas trouvé.
            </span>
          </h1>

          <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-[var(--color-text-inverse-muted)] text-pretty md:text-lg">
            Une page qui dit qui vous êtes, ce que vous faites, où vous êtes et
            combien ça coûte. Livrée, hébergée, et qui s&apos;ouvre vite depuis
            un téléphone.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gem"
            >
              Écrire sur WhatsApp
            </a>
            <a
              href="#realisations"
              className="link tap text-[var(--color-action-inverse)] sm:ml-2"
            >
              Voir les {realisations.length} sites livrés
            </a>
          </div>

          <p className="mt-8 text-[0.9375rem] text-[var(--color-text-inverse-muted)]">
            <Link
              href="/"
              className="tap underline-offset-4 hover:text-[var(--color-text-inverse)] hover:underline active:opacity-70"
            >
              ← Revenir à l&apos;automatisation
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
