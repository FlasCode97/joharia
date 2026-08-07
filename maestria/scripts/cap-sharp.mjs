import { mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const CDP_HTTP = "http://localhost:9222";
const OUT_DIR = join(process.env.TEMP || "C:\\Temp", "maestria-frames");
const VIDEO_OUT = join(process.env.TEMP || "C:\\Temp", "maestria-demo.webp");
const CAP_FPS = 20;
const W = 1920, H = 1080;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let msgId = 0;

async function main() {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const tabs = await (await fetch(`${CDP_HTTP}/json`)).json();
  const tab = tabs.find((t) => t.type === "page");
  if (!tab) throw new Error("No page tab");
  console.log("Tab:", tab.url);

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  const pending = new Map();
  let fc = 0;

  function send(method, params = {}) {
    const id = ++msgId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(`TO:${method}`)); }, 12000);
      pending.set(id, { resolve: (v) => { clearTimeout(timer); resolve(v); }, reject: (e) => { clearTimeout(timer); reject(e); } });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
    } else if (msg.method === "Page.screencastFrame") {
      const { data, sessionId: sid } = msg.params;
      if (data) {
        writeFileSync(join(OUT_DIR, `${String(++fc).padStart(6, "0")}.jpg`), Buffer.from(data, "base64"));
        if (fc % 20 === 0) console.log(`  ${fc} frames`);
      }
      send("Page.screencastFrameAck", { sessionId: sid }).catch(() => {});
    }
  });

  await new Promise((res, rej) => { ws.addEventListener("open", res); ws.addEventListener("error", rej); });
  console.log("CDP OK");

  await send("Runtime.enable");
  await send("Page.enable");

  const loc = await send("Runtime.evaluate", { expression: "window.location.href", returnByValue: true });
  if (!loc.result?.value?.includes("localhost:3000")) {
    console.log("Navigating to localhost:3000...");
    await send("Runtime.evaluate", { expression: `window.location.href='http://localhost:3000'` });
    await sleep(7000);
  }

  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send("Runtime.evaluate", { expression: `window.scrollTo(0,0);var s=document.createElement('style');s.textContent='.cursor-ring,.cursor-dot{display:none!important}';document.head.appendChild(s);` });
  await sleep(2500);

  console.log("Start screencast...");
  await send("Page.startScreencast", { format: "jpeg", quality: 85, maxWidth: W, maxHeight: H, everyNthFrame: 1 });

  async function scrollAnim(dist, ms) {
    await send("Runtime.evaluate", {
      expression: `(function(){var s=window.scrollY,t=s+${dist},t0=performance.now();(function f(){var p=(performance.now()-t0)/${ms};if(p>=1){window.scrollTo(0,t);return}var e=1-Math.pow(1-p,3);window.scrollTo(0,s+${dist}*e);requestAnimationFrame(f)})()})()`,
    });
  }

  // Scenario — longer waits for more frames
  console.log("1/7 Hero reveal"); await sleep(3500);
  console.log("2/7 Scroll to Projects"); await scrollAnim(900, 4500); await sleep(1500);
  console.log("3/7 Hover card"); await send("Runtime.evaluate", { expression: `var c=document.querySelector('.stack-card img');if(c)c.dispatchEvent(new MouseEvent('mouseover',{bubbles:true}))` }); await sleep(2500);
  console.log("4/7 Scroll stack"); await scrollAnim(2600, 9000); await sleep(1200);
  console.log("5/7 Scroll to About"); await scrollAnim(1700, 5500); await sleep(3500);
  console.log("6/7 Scroll to Contact"); await scrollAnim(1500, 5000); await sleep(2500);
  console.log("7/7 Hover submit"); await send("Runtime.evaluate", { expression: `var b=document.querySelector("button[type='submit']");if(b){b.scrollIntoView({block:'center'});b.dispatchEvent(new MouseEvent('mouseover',{bubbles:true}))}` }); await sleep(2500);

  console.log("Stop screencast");
  await send("Page.stopScreencast").catch(() => {});
  await sleep(800);
  ws.close();
  console.log(`Total: ${fc} frames (~${(fc / CAP_FPS).toFixed(1)}s)`);

  if (fc === 0) { console.error("NO FRAMES"); return; }

  // Assemble with sharp → animated WebP
  console.log("Assembling animated WebP with sharp...");
  const files = readdirSync(OUT_DIR).filter(f => f.endsWith(".jpg")).sort();
  const frames = files.map(f => readFileSync(join(OUT_DIR, f)));
  console.log(`  ${frames.length} frames loaded`);

  // Resize all frames to 1280x720 for smaller output, join as animated webp
  const resizedFrames = [];
  for (let i = 0; i < frames.length; i++) {
    const r = await sharp(frames[i]).resize(1280, 720, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
    resizedFrames.push(r);
    if (i % 20 === 0) console.log(`  resized ${i + 1}/${frames.length}`);
  }

  // Join: sharp can create animated webp via raw composite OR we use a different approach
  // sharp supports animated webp via join option (sharp >= 0.33)
  await sharp(resizedFrames, { animated: true })
    .webp({ quality: 75, loop: 0, delay: Math.round(1000 / CAP_FPS) })
    .toFile(VIDEO_OUT.replace(/\.webp$/, "-anim.webp"));

  console.log("VIDEO SAVED:", VIDEO_OUT.replace(/\.webp$/, "-anim.webp"));
}

main().catch((e) => { console.error("FAIL:", e.message); process.exit(1); });
