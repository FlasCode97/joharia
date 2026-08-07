import { chromium } from "@playwright/test";
import { mkdirSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(process.env.TEMP || "C:\\Users\\flaso\\AppData\\Local\\Temp", "maestria-videos");
const URL = "http://localhost:3000";
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function smoothScroll(page, totalDistance, durationMs) {
  const steps = Math.floor(durationMs / (1000 / FPS));
  const stepDist = totalDistance / steps;
  for (let i = 0; i < steps; i++) {
    await page.evaluate(
      (d) => window.scrollBy(0, d),
      stepDist
    );
    await sleep(1000 / FPS);
  }
}

async function run() {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  console.log("Connecting to Edge via CDP (port 9222)...");
  const browser = await chromium.connectOverCDP("http://localhost:9222");

  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: WIDTH, height: HEIGHT },
    },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  console.log("Navigating to", URL);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });

  // Hide custom cursor (it follows mouse and would jitter during automated scroll)
  await page.addStyleTag({
    content: `.cursor-ring, .cursor-dot { display: none !important; }`,
  });

  // Phase 1: Hero — wait for kinetic reveal to complete
  console.log("[1/7] Hero: waiting for kinetic reveal...");
  await sleep(3000);

  // Phase 2: Slow scroll to Projects section
  console.log("[2/7] Scrolling to Projects...");
  await smoothScroll(page, 800, 4000);
  await sleep(1500);

  // Phase 3: Hover a project card to trigger grayscale->color + scale
  console.log("[3/7] Hovering project card...");
  const firstCard = page.locator(".stack-card").first();
  if (await firstCard.count()) {
    await firstCard.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
    await firstCard.hover({ timeout: 5000 }).catch(() => {});
    await sleep(2500);
  }

  // Phase 4: Scroll through all stacked cards
  console.log("[4/7] Scrolling through project stack...");
  await smoothScroll(page, 2400, 9000);
  await sleep(1000);

  // Phase 5: Scroll to About section
  console.log("[5/7] Scrolling to About...");
  await smoothScroll(page, 1600, 5000);
  await sleep(3000);

  // Phase 6: Scroll to Contact section
  console.log("[6/7] Scrolling to Contact...");
  await smoothScroll(page, 1400, 4500);
  await sleep(2500);

  // Phase 7: Hover the submit button for magnetic effect
  console.log("[7/7] Hovering submit button...");
  const submitBtn = page.locator("button[type='submit']").first();
  if (await submitBtn.count()) {
    await submitBtn.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
    await submitBtn.hover({ timeout: 5000 }).catch(() => {});
    await sleep(2000);
  }

  console.log("Disconnecting from browser (finalizing video)...");
  await page.close();
  await context.close();
  await browser.close();

  console.log("Done. Video saved to:", OUT_DIR);
}

run().catch((e) => {
  console.error("CAPTURE FAILED:", e);
  process.exit(1);
});
