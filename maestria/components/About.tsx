"use client";

import { motion } from "motion/react";
import { useAdaptiveSection } from "./useAdaptiveSection";

const bioParagraphs = [
  "Je conçois, code et déploie des produits numériques. Mon terrain de jeu se situe à l'intersection du design, du développement et de l'intelligence artificielle.",
  "Côté agents IA, j'orchestre des systèmes autonomes qui lisent, décident et agissent. Je privilégie la lisibilité du raisonnement sur la magie noire.",
  "Côté sites web, je construis des interfaces éditoriales où la typographie et le mouvement servent le propos. Chaque scroll a une raison.",
  "Côté SaaS, je assemble des tableaux de bord et des outils internes qui réduisent le bruit et amplifient le signal utile.",
];

const skills = [
  "Next.js",
  "TypeScript",
  "GSAP",
  "React-Three-Fiber",
  "Motion",
  "LLM Orchestration",
  "Tailwind",
  "Design Systems",
];

export function About() {
  const { ref, style } = useAdaptiveSection<HTMLElement>();
  return (
    <section ref={ref} id="apropos" style={style} className="relative py-32 md:py-48">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:gap-24 md:px-16">
        <div className="relative">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[2rem] p-1.5 ring-1 ring-[var(--color-hairline)] bg-[var(--color-canvas-elevated)]"
          >
            <div className="relative aspect-[9/11] w-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[var(--color-surface)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.35),transparent_55%),radial-gradient(circle_at_75%_85%,rgba(16,185,129,0.18),transparent_50%)]" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 select-none font-[family-name:var(--font-display)] text-[13rem] leading-none text-white/5">
                F
              </span>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/30">
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
                  Portrait à venir
                </span>
              </div>
            </div>
          </motion.div>

          <div className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-full border border-[rgba(16,25,21,0.1)] bg-[var(--color-canvas)] px-4 py-2 shadow-[0_8px_24px_rgba(16,25,21,0.08)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span className="text-xs font-medium text-[#101915]">
              Disponible pour de nouveaux projets
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="mb-10 font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[var(--color-ink)]">
            À propos
          </h2>

          <div className="divide-y divide-[var(--color-hairline)]">
            {bioParagraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-5 text-base leading-relaxed text-[var(--color-ink-muted)] first:pt-0 last:pb-0"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--color-hairline)] px-3 py-1.5 text-xs text-[var(--color-ink-muted)]"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
