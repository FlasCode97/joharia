type PhotoPlaceholderProps = {
  /** CSS aspect-ratio, ex. "4 / 3" ou "3 / 4" */
  aspect?: string;
  label?: string;
  className?: string;
};

/** Emplacement photo temporaire — à remplacer par une vraie image plus tard.
 * Utilise les tokens adaptatifs pour rester lisible sur fond clair comme foncé. */
export function PhotoPlaceholder({
  aspect = "4 / 3",
  label = "Photo à venir",
  className = "",
}: PhotoPlaceholderProps) {
  return (
    <div
      style={{ aspectRatio: aspect }}
      className={`relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[1.75rem] border border-dashed border-[var(--color-hairline-strong)] bg-[var(--color-hairline)] text-[var(--color-ink-faint)] ${className}`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.5-3.5a2 2 0 0 0-2.8 0L7 19" />
      </svg>
      <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
        {label}
      </span>
    </div>
  );
}
