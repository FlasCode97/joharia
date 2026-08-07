"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { label: "Projets", href: "#projets" },
  { label: "À propos", href: "#apropos" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let last = window.scrollY;
    const onScroll = () => {
      const cur = window.scrollY;
      setHidden(cur > 120 && cur > last);
      last = cur;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6"
      >
        <nav className="flex w-full max-w-3xl items-center justify-between rounded-full border border-[var(--color-hairline)] bg-[var(--color-veil)] px-5 py-3 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[var(--color-ink)]"
          >
            Johària
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-[var(--color-ink)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="gem px-5 py-2 text-sm font-medium transition-transform duration-300 active:scale-[0.97]"
            >
              Travaillons
            </a>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-8 w-8 items-center justify-center md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <span
              className={`absolute h-px w-6 bg-[var(--color-ink)] transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-[6px]"
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-[var(--color-ink)] transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-[6px]"
              }`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-[var(--color-veil-strong)] backdrop-blur-3xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
