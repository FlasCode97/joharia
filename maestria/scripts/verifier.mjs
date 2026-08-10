/* Vérification de rendu : trois largeurs, reduced-motion, JS désactivé.
 * Suppose le site servi sur http://localhost:3000 (npm run start).
 * Lancer : node scripts/verifier.mjs [dossier-de-sortie]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Users\\flaso\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe";

const sortie = process.argv[2] ?? "verification";
await mkdir(sortie, { recursive: true });

const LARGEURS = [
  { nom: "390-mobile", w: 390, h: 844 },
  { nom: "768-tablette", w: 768, h: 1024 },
  { nom: "1440-bureau", w: 1440, h: 900 },
];

const navigateur = await chromium.launch({ executablePath: CHROME, headless: true });
const resultats = [];

async function analyser(ctx, etiquette, pleinePage = false) {
  const page = await ctx.newPage();
  const erreurs = [];
  page.on("pageerror", (e) => erreurs.push(String(e)));
  page.on("console", (m) => m.type() === "error" && erreurs.push(m.text()));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(2500);

  const mesures = await page.evaluate(() => {
    const el = document.documentElement;
    const anim = [...document.querySelectorAll("*")].filter((n) => {
      const cs = getComputedStyle(n);
      return (
        (cs.animationName !== "none" && cs.animationPlayState === "running") ||
        (cs.transitionDuration !== "0s" && cs.transitionDuration !== "")
      );
    }).length;
    const calc = document.querySelector("#automatisation [aria-live]");
    return {
      debordementH: el.scrollWidth > window.innerWidth,
      scrollW: el.scrollWidth,
      innerW: window.innerWidth,
      hauteur: el.scrollHeight,
      canvas: document.querySelectorAll("canvas").length,
      sections: [...document.querySelectorAll("section[id]")].map((s) => s.id),
      bandeau: !!document.getElementById("bandeau-echeance"),
      curseurs: document.querySelectorAll('input[type="range"]').length,
      // le calcul doit être lisible même sans JS : on lit le texte rendu
      calcul: calc ? calc.textContent.replace(/\s+/g, " ").trim().slice(0, 90) : null,
      elementsAnimes: anim,
      imgLazy: [...document.querySelectorAll("img")].map((i) => i.loading),
    };
  });

  await page.screenshot({
    path: path.join(sortie, `${etiquette}.png`),
    fullPage: pleinePage,
  });

  resultats.push({ etiquette, ...mesures, erreursJs: erreurs.slice(0, 3) });
  await page.close();
}

// 1-3 : les trois largeurs
for (const l of LARGEURS) {
  const ctx = await navigateur.newContext({
    viewport: { width: l.w, height: l.h },
    deviceScaleFactor: 1,
    isMobile: l.w < 768,
    hasTouch: l.w < 768,
    locale: "fr-FR",
  });
  await analyser(ctx, l.nom);
  await ctx.close();
}

// 4 : mouvement réduit
{
  const ctx = await navigateur.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    locale: "fr-FR",
    reducedMotion: "reduce",
  });
  await analyser(ctx, "390-mouvement-reduit");
  await ctx.close();
}

// 5 : JavaScript désactivé
{
  const ctx = await navigateur.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    locale: "fr-FR",
    javaScriptEnabled: false,
  });
  await analyser(ctx, "390-sans-javascript");
  await ctx.close();
}

await navigateur.close();

console.log(JSON.stringify(resultats, null, 1));
