"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const springX = useSpring(ringX, { stiffness: 150, damping: 18, mass: 0.4 });
  const springY = useSpring(ringY, { stiffness: 150, damping: 18, mass: 0.4 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onDown = () => {
      ringRef.current?.style.setProperty("transform", "translate(-50%, -50%) scale(0.7)");
    };
    const onUp = () => {
      ringRef.current?.style.removeProperty("transform");
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor='grab'], input, textarea, label");
      if (interactive) {
        ringRef.current?.style.setProperty("width", "64px");
        ringRef.current?.style.setProperty("height", "64px");
        ringRef.current?.style.setProperty("border-color", "rgba(16, 185, 129, 0.6)");
      } else {
        ringRef.current?.style.setProperty("width", "36px");
        ringRef.current?.style.setProperty("height", "36px");
        ringRef.current?.style.setProperty("border-color", "rgba(236, 236, 236, 0.5)");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerover", onOver);
    };
  }, [ringX, ringY, dotX, dotY]);

  return (
    <>
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
