"use client";

import { useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { useAdaptiveSection } from "./useAdaptiveSection";

export function Contact() {
  const [sent, setSent] = useState(false);
  const { ref, style } = useAdaptiveSection<HTMLElement>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section ref={ref} id="contact" style={style} className="relative py-32 md:py-48">
      <div className="mx-auto max-w-2xl px-6 md:px-16">
        <h2 className="mb-16 text-center font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[var(--color-ink)]">
          Travaillons
        </h2>

        <p className="mx-auto mb-12 max-w-md text-center text-base leading-relaxed text-[var(--color-ink-muted)]">
          Un projet, une idée, une collaboration ? Écris-moi, je réponds sous 48 h.
        </p>

        <div className="overflow-hidden rounded-[2rem] p-1.5 ring-1 ring-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="rounded-[calc(2rem-0.375rem)] bg-[var(--color-surface)] p-8 md:p-12">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-surface-ink)]">
                  Message envoyé.
                </p>
                <p className="mt-4 text-sm text-[var(--color-surface-ink-muted)]">
                  Merci. Je reviens vers toi très vite.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-[0.18em] text-[var(--color-surface-ink-faint)]"
                  >
                    Nom
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base text-[var(--color-surface-ink)] placeholder:text-[var(--color-surface-ink-faint)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                    placeholder="Ton nom"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-[0.18em] text-[var(--color-surface-ink-faint)]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base text-[var(--color-surface-ink)] placeholder:text-[var(--color-surface-ink-faint)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                    placeholder="ton@email.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs uppercase tracking-[0.18em] text-[var(--color-surface-ink-faint)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base text-[var(--color-surface-ink)] placeholder:text-[var(--color-surface-ink-faint)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                    placeholder="Parle-moi de ton projet..."
                  />
                </div>

                <div className="mt-2 flex justify-center">
                  <MagneticButton as="button" type="submit" variant="primary">
                    Envoyer
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/15 text-xs transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                      →
                    </span>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
