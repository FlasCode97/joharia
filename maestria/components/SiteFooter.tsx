import Link from "next/link";
import { site } from "@/lib/site";

/** Le lien vers les mentions légales doit être accessible depuis toutes les
 *  pages : article 6-III de la loi pour la confiance dans l'économie
 *  numérique. */
export function SiteFooter() {
  return (
    <footer className="on-dark bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse-muted)]">
      <div className="mx-auto flex max-w-[78rem] flex-col gap-4 border-t border-white/10 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between md:px-12">
        <span>
          {site.name}, {site.zone}
        </span>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/mentions-legales"
            className="tap underline-offset-4 transition-colors duration-150 hover:text-[var(--color-text-inverse)] hover:underline active:opacity-70"
          >
            Mentions légales
          </Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
