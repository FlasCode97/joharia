"use client";

import { useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { useAdaptiveSection } from "./useAdaptiveSection";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const title = "Johària".split("");

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneScroll = useRef(0);
  const { ref: adaptiveRef, style: adaptiveStyle, bgBottom: adaptiveBgBottom } = useAdaptiveSection<HTMLElement>();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      sceneScroll.current = v;
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        adaptiveRef.current = node;
      }}
      id="top"
      style={adaptiveStyle}
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene scrollRef={sceneScroll} />
        </Suspense>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, transparent 55%, ${adaptiveBgBottom} 100%)`,
        }}
      />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-6 pb-24 md:px-16 md:pb-32"
      >
        <div className="ml-auto max-w-5xl text-right">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,11vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[var(--color-ink)]">
            <span className="block overflow-hidden">
              {title.map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.06,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 ml-auto max-w-md text-right text-base text-[var(--color-ink-muted)]"
          >
            Designer-builder. J'orchestre agents IA, sites web et SaaS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap justify-end gap-4"
          >
            <MagneticButton href="#projets" variant="primary">
              Voir les projets
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/15 text-xs transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                ↓
              </span>
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Me contacter
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
