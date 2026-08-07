import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { GradientDial } from "@/components/GradientDial";
import { GradientIntensityProvider } from "@/components/GradientIntensityContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Johària — Designer-builder IA, sites web & SaaS",
  description:
    "Johària orchestre agents IA, sites web et SaaS. Portfolio d'un designer-builder qui conçoit, code et déploie des produits numériques premium.",
  keywords: [
    "designer",
    "agents IA",
    "sites web",
    "SaaS",
    "portfolio",
    "Johària",
  ],
  authors: [{ name: "Johària" }],
  openGraph: {
    title: "Johària — Designer-builder IA, sites web & SaaS",
    description:
      "Johària orchestre agents IA, sites web et SaaS. Portfolio d'un designer-builder premium.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <GradientIntensityProvider>
          <CustomCursor />
          <GrainOverlay />
          {children}
          <GradientDial />
        </GradientIntensityProvider>
      </body>
    </html>
  );
}
