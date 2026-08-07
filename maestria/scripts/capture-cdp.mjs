import { mkdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { execFileSync } from "child_process";

const CDP_HTTP = "http://localhost:9222";
const SITE_URL = "http://localhost:3000";
const OUT_DIR = join(process.env.TEMP || "C:\\Temp", "maestria-frames");
const FFMPEG = "C:\\Users\\flaso\\AppData\\Local\\ms-playwright\\ffmpeg-1011\\ffmpeg-win64.exe";
const VIDEO_OUT = join(process.env.TEMP || "C:\\Temp", "maestria-demo.webm");
const FPS = 25;
const WIDTH = 1920;
const HEIGHT = 1080;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let msgId = 0;

async function cdpFetch(path) {
  const r = await fetch(`${CDP_HTTP}${path}`);
  return r.json();
}

async function main() {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  console.log("Fetching tab...");
  const tabs = await cdpFetch("/json");
  const pageTab = tabs.find((t) => t.type === "page");
  if (!pageTab) throw new Error("No page tab");

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  const pending = new Map();

  function send(method, params = {}) {
    const id = ++msgId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        pending.delete(id);
        reject(new Error(`Timeout: ${method}`));
      }, 15000);
      pending.set(id, {
        resolve: (v) => { clearTimeout(timer); resolve(v); },
        reject: (e) => { clearTimeout(timer); reject(e); },
      });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) p.reject(new Error(msg.error.message));
      else p.resolve(msg.result);
    }
  });

  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", reject);
  });
  console.log("CDP connected");

  await send("Runtime.enable");
  await send("Page.enable");

  console.log("Navigating to", SITE_URL);
  try {
    await send("Page.navigate", { url: SITE_URL });
  } catch (e) {
    console.log("Navigate via CDP failed, trying JS redirect:", e.message);
    await send("Runtime.evaluate", { expression: `window.location.href='${SITE_URL}'` });
  }
  await sleep(6000);
  console.log("Page loaded, starting capture...");

  // Hide custom cursor + set viewport
  await send("Runtime.evaluate", {
    expression: `const s=document.createElement('style');s.textContent='.cursor-ring,.cursor-dot{display:none!important}';document.head.appendChild(s);`,
  });
  await send("Emulation.setDeviceMetricsOverride", {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await sleep(1000);

  let frameCount = 0;

  async function captureFrame() {
    try {
      const result = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });
      if (result.data) {
        const buf = Buffer.from(result.data, "base64");
        writeFileSync(join(OUT_DIR, `${String(frameCount + 1).padStart(6, "0")}.png`), buf);
        frameCount++;
      }
    } catch (e) {
      console.error("frame capture error:", e.message);
    }
  }

  async function captureLoop(durationMs) {
    const framesNeeded = Math.floor(durationMs / (1000 / FPS));
    const interval = 1000 / FPS;
    for (let i = 0; i < framesNeeded; i++) {
      await captureFrame();
      await sleep(interval);
    }
  }

  async function scrollAndCapture(distance, durationMs) {
    // Start scroll animation in page (non-blocking)
    await send("Runtime.evaluate", {
      expression: `
        window.__scrollAnim = new Promise(resolve => {
          const start = window.scrollY;
          const target = start + ${distance};
          const t0 = performance.now();
          function step() {
            const t = (performance.now() - t0) / ${durationMs};
            if (t >= 1) { window.scrollTo(0, target); resolve(); return; }
            const eased = 1 - Math.pow(1 - t, 3);
            window.scrollTo(0, start + ${distance} * eased);
          }
          step();
          requestAnimationFrame(function loop(){
            if(window.scrollY >= target - 1){ resolve(); return; }
            step();
            requestAnimationFrame(loop);
          });
        })
      `,
      awaitPromise: false,
    });
    // Capture while scrolling
    await captureLoop(durationMs);
  }

  // === SCENARIO ===
  console.log("[1/7] Hero reveal...");
  await captureLoop(3000);

  console.log("[2/7] Scroll to Projects...");
  await scrollAndCapture(800, 4000);
  await sleep(500);
  await captureLoop(1000);

  console.log("[3/7] Hover project card...");
  await send("Runtime.evaluate", {
    expression: `document.querySelector('.stack-card')?.scrollIntoView({block:'center'});`,
  });
  await sleep(300);
  await send("Runtime.evaluate", {
    expression: `const c=document.querySelector('.stack-card img');if(c){c.dispatchEvent(new MouseEvent('mouseover',{bubbles:true}));}`,
  });
  await captureLoop(2500);

  console.log("[4/7] Scroll through stack...");
  await scrollAndCapture(2400, 8000);
  await sleep(500);
  await captureLoop(1000);

  console.log("[5/7] Scroll to About...");
  await scrollAndCapture(1600, 5000);
  await captureLoop(3000);

  console.log("[6/7] Scroll to Contact...");
  await scrollAndCapture(1400, 4500);
  await captureLoop(2500);

  console.log("[7/7] Hover submit...");
  await send("Runtime.evaluate", {
    expression: `document.querySelector("button[type='submit']")?.scrollIntoView({block:'center'});`,
  });
  await sleep(300);
  await send("Runtime.evaluate", {
    expression: `document.querySelector("button[type='submit']")?.dispatchEvent(new MouseEvent('mouseover',{bubbles:true}));`,
  });
  await captureLoop(2000);

  console.log(`Captured ${frameCount} frames`);
  ws.close();

  if (frameCount === 0) {
    console.error("No frames!");
    return;
  }

  // Assemble with ffmpeg (execFileSync to avoid shell % escaping issues)
  console.log("Assembling video...");
  const args = [
    "-y",
    "-framerate", String(FPS),
    "-i", join(OUT_DIR, "%06d.png"),
    "-c:v", "libvpx",
    "-b:v", "3M",
    "-vf", `scale=${WIDTH}:${HEIGHT}`,
    VIDEO_OUT,
  ];
  try {
    execFileSync(FFMPEG, args, { stdio: "pipe" });
    console.log("VIDEO SAVED:", VIDEO_OUT);
  } catch (e) {
    console.error("ffmpeg error:", e.stderr?.toString()?.substring(0, 500));
    console.log("Frames in:", OUT_DIR);
  }
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
