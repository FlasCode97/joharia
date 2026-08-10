import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse-muted)]">
      <div className="mx-auto flex max-w-[78rem] flex-col gap-3 border-t border-white/10 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between md:px-12">
        <span>
          {site.name} — {site.zone}
        </span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
