import type { Metadata, Viewport } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Johària, sites internet pour les commerces de Guadeloupe",
  description:
    "Je crée des sites pour les commerces et les artisans de Guadeloupe et j'automatise les tâches répétitives. Un seul interlocuteur, hébergement compris.",
  openGraph: {
    title: "Johària, sites internet pour les commerces de Guadeloupe",
    description:
      "Un site qu'on trouve quand on vous cherche, et les tâches répétitives en moins. Guadeloupe.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F0C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${archivo.variable}`}>
      <head>
        {/* Posé AVANT peinture. Les états masqués des révélations au scroll
            sont conditionnés à cette classe : sans JavaScript, rien n'est
            caché et toute la copie reste lisible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
