import type { NextConfig } from "next";

/* GitHub Pages sert le site depuis un sous-chemin (/joharia), pas depuis la
   racine. Sans basePath, tous les liens internes et toutes les ressources
   pointeraient à côté. La valeur vient de l'environnement pour que le même
   dépôt reste déployable à la racine sur Cloudflare Pages, où la variable
   n'est simplement pas définie. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Export statique : le site n'a ni formulaire serveur, ni route d'API, ni
     rendu dynamique. Toutes ses pages sont déjà prérendues. */
  output: "export",

  /* L'optimisation d'images de Next exige un serveur. Sans lui, on sert les
     fichiers tels quels : ils sont déjà en WebP et pèsent 29 et 58 Ko. */
  images: { unoptimized: true },

  /* Chaque page devient un dossier avec son index.html, ce qui donne des
     URL propres sur un hébergeur de fichiers statiques. */
  trailingSlash: true,

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
