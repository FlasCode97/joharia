/* Capture les sites livrés, au format téléphone.
 * Produit public/realisations/<nom>.webp
 * Lancer : node scripts/capture-realisations.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir, unlink } from "node:fs/promises";
import path from "node:path";

const SITES = [
  { nom: "dylan-etonno", url: "https://dylan-etonno.pages.dev" },
  { nom: "domaine-de-richard", url: "https://domaine-de-richard.pages.dev" },
];

const LARGEUR = 390;
const HAUTEUR = 844;
const ECHELLE = 2; // rendu net sur écran retina

// Le « headless shell » livré par Playwright est corrompu sur ce poste
// (spawn EFTYPE). On pointe sur le Chromium complet, qui lui fonctionne.
const CHROME =
  process.env.CHROME_PATH ??
  "C:/Users/flaso/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe";

const dossier = path.join(process.cwd(), "public", "realisations");
await mkdir(dossier, { recursive: true });

const navigateur = await chromium.launch({
  executablePath: CHROME,
  headless: true,
});

for (const site of SITES) {
  const tmpPng = path.join(dossier, `_tmp-${site.nom}.png`);
  const sortie = path.join(dossier, `${site.nom}.webp`);

  const contexte = await navigateur.newContext({
    viewport: { width: LARGEUR, height: HAUTEUR },
    deviceScaleFactor: ECHELLE,
    isMobile: true,
    hasTouch: true,
    locale: "fr-FR",
  });

  const page = await contexte.newPage();
  await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60_000 });

  // On laisse les animations d'apparition ALLER À LEUR TERME : forcer
  // reduced-motion les fige à mi-course et produit des visuels transparents.
  await page.waitForTimeout(4000);
  await page.evaluate(() => document.fonts?.ready);

  // Les images en lazy-load ne se déclenchent qu'au scroll : on parcourt
  // toute la page, puis on remonte.
  await page.evaluate(async () => {
    const pas = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += pas) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => window.scrollY === 0, null, { timeout: 10_000 });

  // Certains sites ont un carrousel ou une vidéo en fond : capturé au hasard,
  // on attrape une transition à mi-course et l'image montre une couture.
  // On fige tout, puis on laisse la dernière image se stabiliser.
  await page.evaluate(() => {
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });
    document.querySelectorAll("*").forEach((el) => {
      const s = getComputedStyle(el);
      if (s.animationName !== "none") el.style.animationPlayState = "paused";
    });
  });
  await page.waitForTimeout(2500);

  await page.screenshot({ path: tmpPng });
  await contexte.close();

  const meta = await sharp(tmpPng).webp({ quality: 82 }).toFile(sortie);
  await unlink(tmpPng);

  console.log(
    `${site.nom.padEnd(20)} ${meta.width}x${meta.height}px  ${(meta.size / 1024).toFixed(0)} Ko`
  );
}

await navigateur.close();
console.log(`\ndimensions à déclarer dans next/image : width={${LARGEUR}} height={${HAUTEUR}}`);
