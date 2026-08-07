"use client";

import { useRef, type ReactNode } from "react";
import { useMotionValue, useSpring, motion } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  as?: "a" | "button";
  type?: "button" | "submit";
  onClick?: () => void;
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  as = "a",
  type = "button",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.25);
    y.set(my * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-3 px-7 py-3.5 text-sm font-medium transition-transform duration-300 active:scale-[0.97]";
  const styles = variant === "primary" ? "gem" : "gem-outline";

  if (as === "button") {
    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ x: sx, y: sy }}
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
