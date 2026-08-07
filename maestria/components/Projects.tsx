"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/lib/projects";
import { useAdaptiveSection } from "./useAdaptiveSection";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, style, bgTop, bgBottom } = useAdaptiveSection<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="stack-card sticky top-0 flex min-h-[100dvh] w-full items-center justify-center px-4 py-20 md:px-16"
      style={{
        ...style,
        zIndex: index + 1,
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgBottom} 100%)`,
      }}
    >
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="order-1 md:order-2">
          <div className="overflow-hidden rounded-[2rem] p-1.5 ring-1 ring-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#0c0c0c]">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:grayscale-0 hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="order-2 md:order-1">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent-ink)]">
              {project.category}
            </span>
            <span className="text-xs text-[var(--color-ink-faint)]">
              {project.year}
            </span>
          </div>

          <h3 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-medium leading-[0.95] tracking-[-0.03em] text-[var(--color-ink)] md:text-6xl">
            {project.title}
          </h3>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--color-ink-muted)]">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--color-hairline)] px-3 py-1 text-xs text-[var(--color-ink-muted)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 font-[family-name:var(--font-body)] text-sm text-[var(--color-ink-faint)]">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { ref: headingRef, style: headingStyle } = useAdaptiveSection<HTMLDivElement>();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.5,
          filter: "brightness(0.7)",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projets" className="relative py-32 md:py-48">
      <div
        ref={headingRef}
        style={headingStyle}
        className="mx-auto mb-20 grid max-w-6xl grid-cols-1 items-end gap-10 px-6 md:grid-cols-[1fr_auto] md:gap-16 md:px-16"
      >
        <div className="order-2 grid grid-cols-2 gap-4 md:order-1 md:gap-6">
          <PhotoPlaceholder aspect="4 / 3" className="md:mb-10" />
          <PhotoPlaceholder aspect="4 / 3" />
        </div>
        <h2 className="order-1 font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[var(--color-ink)] md:order-2 md:text-right">
          Projets
        </h2>
      </div>

      <div ref={wrapRef} className="relative">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
