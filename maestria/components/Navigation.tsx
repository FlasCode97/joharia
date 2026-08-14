import Link from "next/link";
import { whatsappUrl, site } from "@/lib/site";

/** Deux pages, deux entrées. Pas de menu hamburger : sur mobile on garde le
 *  strict nécessaire — le nom, l'autre page, et WhatsApp. */
export function Navigation({ page }: { page: "auto" | "sites" }) {
  const actif = "text-[var(--color-text-inverse)]";
  const inactif =
    "text-[var(--color-text-inverse-muted)] hover:text-[var(--color-text-inverse)]";

  return (
    <header className="on-dark relative z-50 bg-[var(--color-surface-inverse)]">
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-[78rem] items-center justify-between gap-4 px-6 py-5 md:px-12"
      >
        <Link
          href="/"
          className="tap shrink-0 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-text-inverse)]"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-5 sm:gap-7">
          <Link
            href="/"
            aria-current={page === "auto" ? "page" : undefined}
            className={`tap text-[0.875rem] underline-offset-4 transition-colors duration-150 hover:underline active:opacity-70 sm:text-[0.9375rem] ${page === "auto" ? actif : inactif}`}
          >
            Automatisation
          </Link>
          <Link
            href="/sites-web"
            aria-current={page === "sites" ? "page" : undefined}
            className={`tap text-[0.875rem] underline-offset-4 transition-colors duration-150 hover:underline active:opacity-70 sm:text-[0.9375rem] ${page === "sites" ? actif : inactif}`}
          >
            Sites web
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap text-[0.875rem] font-semibold text-[var(--color-action-inverse)] underline-offset-4 transition-colors duration-150 hover:underline active:opacity-70 sm:text-[0.9375rem]"
          >
            WhatsApp
          </a>
        </div>
      </nav>
    </header>
  );
}
