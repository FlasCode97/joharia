"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

/** Décide si l'appareil peut se permettre la scène 3D (211 Ko compressés,
 *  ~800 Ko à analyser). Sur un Android d'entrée de gamme en 4G moyenne, le
 *  coût dépasse le bénéfice : on sert l'aplat sombre, le texte ne bouge pas. */
const DESKTOP = "(min-width: 768px)";

function canAffordScene() {
  if (typeof window === "undefined") return false;

  // Sous 768px la scène est masquée en CSS : la monter quand même ferait
  // télécharger 211 Ko invisibles sur le téléphone du gérant.
  if (!window.matchMedia(DESKTOP).matches) return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores < 4) return false;

  const conn = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return false;

  return true;
}

export function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const clear = () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      idleId = timeoutId = undefined;
    };

    const evaluate = () => {
      clear();
      if (!canAffordScene()) {
        setEnabled(false);
        return;
      }
      // On attend que le navigateur soit inactif : le titre et le bouton
      // WhatsApp sont peints avant que la 3D commence à se télécharger.
      const ric = window.requestIdleCallback as
        | typeof window.requestIdleCallback
        | undefined;
      if (typeof ric === "function") {
        idleId = ric(() => setEnabled(true), { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(() => setEnabled(true), 1200);
      }
    };

    evaluate();

    // Rotation de l'écran ou fenêtre agrandie : on réévalue.
    const mq = window.matchMedia(DESKTOP);
    mq.addEventListener("change", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      clear();
    };
  }, []);

  if (!enabled) return null;
  return <HeroScene />;
}
