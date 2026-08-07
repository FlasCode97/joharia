import { chromium } from "@playwright/test";
import { writeFileSync } from "fs";

const log = (m) => {
  console.log(m);
  writeFileSync("C:\\Users\\flaso\\OneDrive\\Desktop\\Portfollio site\\maestria\\pw-log.txt", m + "\n", { flag: "a" });
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  log("Connecting to Edge via CDP...");
  const browser = await chromium.connectOverCDP("http://localhost:9222");
  log("Connected");

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: "C:\\Users\\flaso\\AppData\\Local\\Temp\\maestria-pw-videos",
      size: { width: 1920, height: 1080 },
    },
  });
  log("Context with recordVideo created");

  const page = await context.newPage();
  log("Navigating to localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 45000 });
  log("Page loaded");

  await page.addStyleTag({ content: `.cursor-ring,.cursor-dot{display:none!important}` });
  await sleep(3000);
  log("Hero reveal done");

  // Smooth scroll helper
  const smoothScroll = async (dist, ms) => {
    await page.evaluate(([d, t]) => {
      return new Promise((resolve) => {
        const s = window.scrollY;
        const target = s + d;
        const t0 = performance.now();
        function step() {
          const p = (performance.now() - t0) / t;
          if (p >= 1) { window.scrollTo(0, target); resolve(); return; }
          const e = 1 - Math.pow(1 - p, 3);
          window.scrollTo(0, s + d * e);
          requestAnimationFrame(step);
        }
        step();
      });
    }, [dist, ms]);
  };

  log("2/7 Scroll to Projects");
  await smoothScroll(900, 4000);
  await sleep(1500);

  log("3/7 Hover card");
  await page.locator(".stack-card img").first().hover({ timeout: 5000 }).catch(() => {});
  await sleep(2500);

  log("4/7 Scroll stack");
  await smoothScroll(2600, 8000);
  await sleep(1000);

  log("5/7 Scroll to About");
  await smoothScroll(1700, 5000);
  await sleep(3000);

  log("6/7 Scroll to Contact");
  await smoothScroll(1500, 4500);
  await sleep(2500);

  log("7/7 Hover submit");
  await page.locator("button[type='submit']").first().hover({ timeout: 5000 }).catch(() => {});
  await sleep(2000);

  log("Closing page (finalizes video)...");
  await page.close();
  const vid = await page.video()?.path().catch(() => null);
  log("Video path: " + vid);
  await context.close();
  await browser.close();
  log("DONE");
}

main().catch((e) => { log("FAIL: " + e.message); process.exit(1); });
