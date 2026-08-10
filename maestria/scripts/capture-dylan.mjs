/* Capture du site livré à Dylan Etonno, au format téléphone.
 * Produit public/realisations/dylan-etonno.webp
 * Lancer : node scripts/capture-dylan.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir, unlink } from "node:fs/promises";
import path from "node:path";

const URL = "https://dylan-etonno.pages.dev";
const LARGEUR = 390;
const HAUTEUR = 844;
const ECHELLE = 2; // rendu net sur écran retina

const dossier = path.join(process.cwd(), "public", "realisations");
const tmpPng = path.join(dossier, "_tmp-dylan.png");
const sortie = path.join(dossier, "dylan-etonno.webp");

await mkdir(dossier, { recursive: true });

// Le "headless shell" livré par Playwright est corrompu sur ce poste
// (spawn EFTYPE). On pointe sur le Chromium complet, qui lui fonctionne.
const CHROME_COMPLET =
  process.env.CHROME_PATH ??
  "C:\\Users\\flaso\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe";

const navigateur = await chromium.launch({
  executablePath: CHROME_COMPLET,
  headless: true,
});
const contexte = await navigateur.newContext({
  viewport: { width: LARGEUR, height: HAUTEUR },
  deviceScaleFactor: ECHELLE,
  isMobile: true,
  hasTouch: true,
  locale: "fr-FR",
});

const page = await contexte.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });

// On laisse les animations d'apparition ALLER À LEUR TERME : forcer
// reduced-motion les fige à mi-course et produit des visuels transparents.
await page.waitForTimeout(4000);
await page.evaluate(() => document.fonts?.ready);
// Les images en lazy-load ne se déclenchent qu'au scroll : on parcourt puis on remonte.
await page.evaluate(async () => {
  const pas = window.innerHeight / 2;
  for (let y = 0; y < document.body.scrollHeight; y += pas) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
// On attend le retour effectif en haut : un scroll fluide peut encore courir.
await page.waitForFunction(() => window.scrollY === 0, null, { timeout: 10_000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: tmpPng });
await navigateur.close();

const meta = await sharp(tmpPng).webp({ quality: 82 }).toFile(sortie);
await unlink(tmpPng);

console.log(`écrit  ${path.relative(process.cwd(), sortie)}`);
console.log(`       ${meta.width}x${meta.height}px  ${(meta.size / 1024).toFixed(0)} Ko`);
console.log(`       dimensions à déclarer dans next/image : width={${LARGEUR}} height={${HAUTEUR}}`);
