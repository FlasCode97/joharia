"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const GradientIntensityContext = createContext<{
  intensity: number;
  setIntensity: (v: number) => void;
}>({
  intensity: 95,
  setIntensity: () => {},
});

export function GradientIntensityProvider({ children }: { children: ReactNode }) {
  const [intensity, setIntensity] = useState(95);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--gradient-intensity",
      (intensity / 100).toFixed(3)
    );
  }, [intensity]);

  return (
    <GradientIntensityContext.Provider value={{ intensity, setIntensity }}>
      {children}
    </GradientIntensityContext.Provider>
  );
}

export function useGradientIntensity() {
  return useContext(GradientIntensityContext);
}
