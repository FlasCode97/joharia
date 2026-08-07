const CANVAS_RGB: [number, number, number] = [242, 248, 245];
const TOP_RGB: [number, number, number] = [2, 8, 6];
const BOTTOM_RGB: [number, number, number] = [16, 185, 129];

export const DARK_INK = {
  ink: "#101915",
  inkMuted: "#4c5a53",
  inkFaint: "#75857c",
  hairline: "rgba(16, 25, 21, 0.12)",
  hairlineStrong: "rgba(16, 25, 21, 0.26)",
  accentInk: "#047857",
};

export const LIGHT_INK = {
  ink: "#f4faf7",
  inkMuted: "#b7cdc2",
  inkFaint: "#8fa79b",
  hairline: "rgba(255, 255, 255, 0.16)",
  hairlineStrong: "rgba(255, 255, 255, 0.32)",
  accentInk: "#34d399",
};

/* For mid-luminance backgrounds (emerald greens) where neither pure-light nor
 * soft-dark ink reads well: strong dark ink wins there. */
export const MID_INK = {
  ink: "#06130d",
  inkMuted: "#0d2a1e",
  inkFaint: "#1d4534",
  hairline: "rgba(6, 19, 13, 0.24)",
  hairlineStrong: "rgba(6, 19, 13, 0.44)",
  accentInk: "#064e3b",
};

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Blended, opaque page background color at a given vertical fraction (0 = top, 1 = bottom) and gradient intensity (0-100). */
export function pageColorAt(fraction: number, intensityPct: number): [number, number, number] {
  const f = Math.max(0, Math.min(1, fraction));
  const a = Math.max(0, Math.min(100, intensityPct)) / 100;
  const tint: [number, number, number] = [
    mix(TOP_RGB[0], BOTTOM_RGB[0], f),
    mix(TOP_RGB[1], BOTTOM_RGB[1], f),
    mix(TOP_RGB[2], BOTTOM_RGB[2], f),
  ];
  return [
    mix(CANVAS_RGB[0], tint[0], a),
    mix(CANVAS_RGB[1], tint[1], a),
    mix(CANVAS_RGB[2], tint[2], a),
  ];
}

export function rgbToCss([r, g, b]: [number, number, number]) {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/** Perceptual-ish relative luminance (0-1) from raw 0-255 sRGB channels. */
export function luminance([r, g, b]: [number, number, number]) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** Returns the ink token set that stays readable on this background. */
export function inkTokensFor(rgb: [number, number, number]) {
  const l = luminance(rgb);
  if (l < 0.46) return LIGHT_INK;
  if (l < 0.68) return MID_INK;
  return DARK_INK;
}
