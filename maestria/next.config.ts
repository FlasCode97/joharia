import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Export statique : le site n'a ni formulaire serveur, ni route d'API, ni
     rendu dynamique. Toutes ses pages sont déjà prérendues. En sortie
     statique, il se dépose tel quel sur Cloudflare Pages, comme les deux
     autres sites livrés, sans serveur Node à maintenir. */
  output: "export",

  /* L'optimisation d'images de Next exige un serveur. Sans lui, on sert les
     fichiers tels quels : ils sont déjà en WebP et pèsent 28 et 57 Ko. */
  images: { unoptimized: true },

  /* Chaque page devient un dossier avec son index.html, ce qui donne des
     URL propres sans extension sur un hébergeur de fichiers statiques. */
  trailingSlash: true,
};

export default nextConfig;
