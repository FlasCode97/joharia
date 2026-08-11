/* Vérifie les comportements liés au scroll, que l'aperçu intégré ne peut pas
 * tester (son IntersectionObserver ne se déclenche jamais).
 *   node scripts/verifier-scroll.mjs
 */
import { chromium } from "playwright";

const URL = "http://localhost:3000";
const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Users\\flaso\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe";

const navigateur = await chromium.launch({ executablePath: CHROME, headless: true });

async function scenario(nom, { reducedMotion } = {}) {
  const ctx = await navigateur.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    locale: "fr-FR",
    ...(reducedMotion ? { reducedMotion: "reduce" } : {}),
  });
  const page = await ctx.newPage();
  // `networkidle` n'aboutit pas ici (une connexion reste ouverte) : on attend
  // le DOM puis l'hydratation, constatée par la présence des curseurs.
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForSelector("#devis-semaine", { timeout: 30_000 });
  await page.waitForTimeout(900);

  const lire = () =>
    page.evaluate(() => {
      const barre = document.querySelector(".barre-whatsapp");
      const chaine = document.querySelector("[data-pause-hors-champ]");
      const trait = document.querySelector(".chaine-trait");
      return {
        scrollY: Math.round(window.scrollY),
        barreVisible: barre ? !barre.classList.contains("barre-whatsapp-cachee") : null,
        chaineEnPause: chaine ? chaine.classList.contains("hors-champ") : null,
        animTrait: trait ? getComputedStyle(trait).animationPlayState : null,
        ratureFaite: !!document.querySelector("[data-reveler].vu"),
      };
    });

  const etapes = [];
  etapes.push({ ou: "haut", ...(await lire()) });

  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(700);
  etapes.push({ ou: "900px", ...(await lire()) });

  await page.evaluate(() => {
    document.querySelector("[data-reveler]")?.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(900);
  etapes.push({ ou: "bloc avant/apres", ...(await lire()) });

  await page.evaluate(() => document.getElementById("contact")?.scrollIntoView());
  await page.waitForTimeout(800);
  etapes.push({ ou: "contact", ...(await lire()) });

  await ctx.close();
  return { nom, etapes };
}

const normal = await scenario("normal");
const reduit = await scenario("mouvement reduit", { reducedMotion: true });
await navigateur.close();

const ligne = (e) =>
  `    ${e.ou.padEnd(18)} scroll=${String(e.scrollY).padStart(5)}  barre=${String(e.barreVisible).padEnd(5)}  chainePause=${String(e.chaineEnPause).padEnd(5)}  anim=${String(e.animTrait).padEnd(7)}  rature=${e.ratureFaite}`;

for (const s of [normal, reduit]) {
  console.log(`\n### ${s.nom}`);
  s.etapes.forEach((e) => console.log(ligne(e)));
}

/* Attendus */
const n = Object.fromEntries(normal.etapes.map((e) => [e.ou, e]));
const controles = [
  ["barre cachée en haut", n["haut"].barreVisible === false],
  ["barre visible après 900px", n["900px"].barreVisible === true],
  ["barre cachée sur contact", n["contact"].barreVisible === false],
  ["chaîne en pause hors champ", n["contact"].chaineEnPause === true],
  ["animation stoppée hors champ", n["contact"].animTrait === "paused"],
  ["chaîne active en haut", n["haut"].chaineEnPause === false],
  ["rature déclenchée au scroll", n["bloc avant/apres"].ratureFaite === true],
  [
    "mouvement réduit : rature déjà posée",
    reduit.etapes[0].ratureFaite === true,
  ],
];

console.log("\n### contrôles");
let ko = 0;
for (const [libelle, ok] of controles) {
  if (!ok) ko++;
  console.log(`    ${ok ? "OK  " : "ECHEC"} ${libelle}`);
}
console.log(`\n${controles.length - ko}/${controles.length} contrôles passés`);
process.exit(ko ? 1 : 0);
