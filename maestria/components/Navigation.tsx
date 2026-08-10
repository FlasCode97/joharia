import { whatsappUrl, site } from "@/lib/site";

const links = [
  { label: "Un site", href: "#ce-que-je-fais" },
  { label: "Vos tâches", href: "#automatisation" },
  { label: "Réalisation", href: "#realisation" },
  { label: "Comment ça se passe", href: "#comment" },
];

/** Pas de menu hamburger : trois ancres sur une page courte ne justifient pas
 *  un panneau plein écran. Sur mobile, seul le bouton WhatsApp reste — c'est
 *  la seule action qui compte. */
export function Navigation() {
  return (
    <header className="on-dark relative z-50 bg-[var(--color-surface-inverse)]">
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-[78rem] items-center justify-between gap-6 px-6 py-5 md:px-12"
      >
        <a
          href="#top"
          className="tap font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-text-inverse)]"
        >
          {site.name}
        </a>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="tap text-[0.9375rem] text-[var(--color-text-inverse-muted)] underline-offset-4 transition-colors duration-150 hover:text-[var(--color-text-inverse)] hover:underline active:opacity-70"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap text-[0.9375rem] font-semibold text-[var(--color-action-inverse)] underline-offset-4 transition-colors duration-150 hover:underline active:opacity-70"
          >
            WhatsApp
          </a>
        </div>
      </nav>
    </header>
  );
}
