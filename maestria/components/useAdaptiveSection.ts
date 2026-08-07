"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useGradientIntensity } from "./GradientIntensityContext";
import { pageColorAt, inkTokensFor, rgbToCss } from "@/lib/adaptiveColor";

/** Measures a section's vertical position on the page and exposes ink-token CSS vars
 * that keep text readable against the flowing background gradient at that position.
 * Also exposes the page color at the section's top and bottom edges so a section can
 * paint a background gradient that blends seamlessly into the page. */
export function useAdaptiveSection<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const { intensity } = useGradientIntensity();
  const [style, setStyle] = useState<CSSProperties>({});
  const [bg, setBg] = useState(rgbToCss([242, 248, 245]));
  const [bgTop, setBgTop] = useState(rgbToCss([242, 248, 245]));
  const [bgBottom, setBgBottom] = useState(rgbToCss([242, 248, 245]));

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalH = document.documentElement.scrollHeight;
      const topY = rect.top + window.scrollY;
      const centerY = topY + rect.height / 2;
      const rgb = pageColorAt(totalH > 0 ? centerY / totalH : 0, intensity);
      const rgbTop = pageColorAt(totalH > 0 ? topY / totalH : 0, intensity);
      const rgbBottom = pageColorAt(
        totalH > 0 ? (topY + rect.height) / totalH : 0,
        intensity
      );
      const tokens = inkTokensFor(rgb);
      setBg(rgbToCss(rgb));
      setBgTop(rgbToCss(rgbTop));
      setBgBottom(rgbToCss(rgbBottom));
      setStyle({
        ["--color-ink" as string]: tokens.ink,
        ["--color-ink-muted" as string]: tokens.inkMuted,
        ["--color-ink-faint" as string]: tokens.inkFaint,
        ["--color-hairline" as string]: tokens.hairline,
        ["--color-hairline-strong" as string]: tokens.hairlineStrong,
        ["--color-accent-ink" as string]: tokens.accentInk,
      });
    };
    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [intensity]);

  return { ref, style, bg, bgTop, bgBottom };
}
