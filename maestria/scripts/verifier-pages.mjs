/* Vérifie les deux pages, à trois largeurs, en mouvement réduit et sans JS.
 * Produit des captures et un rapport.
 *   node scripts/verifier-pages.mjs <dossier-de-sortie>
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "http://localhost:3000";
const CHROME =
  process.env.CHROME_PATH ??
  "C:/Users/flaso/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe";

const sortie = process.argv[2] ?? "verification";
await mkdir(sortie, { recursive: true });

const PAGES = [
  { nom: "accueil-automatisation", url: BASE + "/" },
  { nom: "sites-web", url: BASE + "/sites-web" },
];

const MODES = [
  { etiquette: "390", w: 390, h: 844, mobile: true },
  { etiquette: "768", w: 768, h: 1024, mobile: false },
  { etiquette: "1440", w: 1440, h: 900, mobile: false },
  { etiquette: "390-mouvement-reduit", w: 390, h: 844, mobile: true, reduce: true },
  { etiquette: "390-sans-js", w: 390, h: 844, mobile: true, sansJs: true },
];

const navigateur = await chromium.launch({ executablePath: CHROME, headless: true });
const rapport = [];

for (const p of PAGES) {
  for (const m of MODES) {
    const ctx = await navigateur.newContext({
      viewport: { width: m.w, height: m.h },
      isMobile: m.mobile,
      hasTouch: m.mobile,
      locale: "fr-FR",
      javaScriptEnabled: !m.sansJs,
      ...(m.reduce ? { reducedMotion: "reduce" } : {}),
    });
    const page = await ctx.newPage();
    const erreurs = [];
    page.on("pageerror", (e) => erreurs.push(String(e).slice(0, 140)));

    await page.goto(p.url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForTimeout(m.sansJs ? 1200 : 2200);

    const mesure = await page.evaluate(() => {
      const doc = document.documentElement;
      const cibles = [...document.querySelectorAll("a,button")].filter((e) => {
        const b = e.getBoundingClientRect();
        return b.width > 1 || b.height > 1;
      });
      return {
        titre: document.title,
        h1: document.querySelector("h1")?.textContent?.trim().slice(0, 46) ?? null,
        debordement: doc.scrollWidth > window.innerWidth,
        sections: [...document.querySelectorAll("section[id]")].map((s) => s.id),
        // Le minimum de 44px ne vaut qu'au doigt : `.tap` ne s'applique
        // qu'en `pointer: coarse`, et une souris n'en a pas besoin.
        ciblesTropPetites: matchMedia("(pointer: coarse)").matches
          ? cibles.filter((e) => e.getBoundingClientRect().height < 44).length
          : 0,
        imagesNonLazy: [...document.querySelectorAll("img")].filter(
          (i) => i.loading !== "lazy"
        ).length,
        images: document.querySelectorAll("img").length,
        // le devis de démonstration doit être lisible même sans JS
        demoTotal:
          document.querySelector("#demonstrations table tfoot")?.textContent?.replace(/\s+/g, " ").trim().slice(0, 40) ?? null,
      };
    });

    await page.screenshot({
      path: path.join(sortie, `${p.nom}-${m.etiquette}.png`),
    });
    await ctx.close();

    rapport.push({ page: p.nom, mode: m.etiquette, ...mesure, erreurs });
  }
}

await navigateur.close();

let ko = 0;
console.log("");
for (const r of rapport) {
  const pbs = [];
  if (r.debordement) pbs.push("DEBORDEMENT");
  if (r.ciblesTropPetites) pbs.push(`${r.ciblesTropPetites} cibles <44px`);
  if (r.imagesNonLazy) pbs.push(`${r.imagesNonLazy} img non-lazy`);
  if (r.erreurs.length) pbs.push(`${r.erreurs.length} erreurs JS`);
  if (pbs.length) ko++;
  console.log(
    `${(r.page + " / " + r.mode).padEnd(40)} ${pbs.length ? "ECHEC  " + pbs.join(", ") : "OK"}`
  );
  if (r.erreurs.length) r.erreurs.forEach((e) => console.log("      " + e));
}

console.log("\n--- détail ---");
for (const r of rapport.filter((x) => x.mode === "390" || x.mode === "390-sans-js")) {
  console.log(`\n${r.page} / ${r.mode}`);
  console.log(`   h1       : ${r.h1}`);
  console.log(`   sections : ${r.sections.join(", ")}`);
  console.log(`   images   : ${r.images}`);
  if (r.demoTotal) console.log(`   demo     : ${r.demoTotal}`);
}

console.log(`\n${rapport.length - ko}/${rapport.length} contrôles passés`);
process.exit(ko ? 1 : 0);
