"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGradientIntensity } from "./GradientIntensityContext";

const MIN_DEG = -135;
const MAX_DEG = 135;
const SWEEP = MAX_DEG - MIN_DEG;
const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_LEN = CIRCUMFERENCE * (SWEEP / 360);

export function GradientDial() {
  const knobRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const { intensity: value, setIntensity } = useGradientIntensity();

  const applyValue = useCallback(
    (v: number) => {
      const clamped = Math.max(0, Math.min(100, Math.round(v)));
      setIntensity(clamped);
    },
    [setIntensity]
  );

  const setFromClient = useCallback(
    (clientX: number, clientY: number) => {
      const el = knobRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const deg = Math.atan2(clientX - cx, -(clientY - cy)) * (180 / Math.PI);
      let normalized = deg;
      if (normalized > MAX_DEG && normalized <= 180) normalized = MAX_DEG;
      if (normalized < MIN_DEG && normalized >= -180) normalized = MIN_DEG;
      const c = Math.max(MIN_DEG, Math.min(MAX_DEG, normalized));
      applyValue(((c - MIN_DEG) / SWEEP) * 100);
    },
    [applyValue]
  );

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      setFromClient(e.clientX, e.clientY);
    };
    const up = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClient]);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    setFromClient(e.clientX, e.clientY);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      applyValue(value + 5);
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      applyValue(value - 5);
    }
  };

  const fillLen = (value / 100) * ARC_LEN;

  return (
    <div
      ref={knobRef}
      role="slider"
      aria-label="Intensité du dégradé de fond"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      className="fixed bottom-6 right-6 z-40 flex h-16 w-16 touch-none select-none items-center justify-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-veil)] shadow-[0_8px_24px_rgba(16,25,21,0.12)] backdrop-blur-2xl cursor-grab active:cursor-grabbing"
    >
      <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0 -rotate-[135deg]">
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${ARC_LEN} ${CIRCUMFERENCE}`}
        />
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${fillLen} ${CIRCUMFERENCE}`}
        />
      </svg>
      <span className="pointer-events-none text-xs font-medium text-[var(--color-ink)]">
        {value}%
      </span>
    </div>
  );
}
