"use client";

import { useAdaptiveSection } from "./useAdaptiveSection";

const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:hello@joharia.design" },
];

export function SiteFooter() {
  const { ref, style } = useAdaptiveSection<HTMLElement>();
  return (
    <footer ref={ref} style={style} className="border-t border-[var(--color-hairline)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-16">
        <span className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[var(--color-ink)]">
          Johària
        </span>

        <div className="flex items-center gap-8">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-[var(--color-ink)]"
            >
              {s.label}
            </a>
          ))}
        </div>

        <span className="text-xs text-[var(--color-ink-faint)]">
          © {new Date().getFullYear()} Johària
        </span>
      </div>
    </footer>
  );
}
