import { mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { execFileSync, spawnSync } from "child_process";

const CDP_HTTP = "http://localhost:9222";
const OUT_DIR = join(process.env.TEMP || "C:\\Temp", "maestria-frames");
const FFMPEG = "C:\\Users\\flaso\\AppData\\Local\\ms-playwright\\ffmpeg-1011\\ffmpeg-win64.exe";
const VIDEO_OUT = join(process.env.TEMP || "C:\\Temp", "maestria-demo.webm");
const CAP_FPS = 15;
const W = 1920, H = 1080;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let msgId = 0;

async function main() {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const tabs = await (await fetch(`${CDP_HTTP}/json`)).json();
  const tab = tabs.find((t) => t.type === "page");
  if (!tab) throw new Error("No tab");
  console.log("Tab:", tab.url);

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  const pending = new Map();
  let fc = 0;
  let sessionId = null;

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
        if (fc % 15 === 0) console.log(`  ${fc} frames`);
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
    await send("Runtime.evaluate", { expression: `window.location.href='http://localhost:3000'` });
    await sleep(6000);
  }

  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send("Runtime.evaluate", { expression: `window.scrollTo(0,0);var s=document.createElement('style');s.textContent='.cursor-ring,.cursor-dot{display:none!important}';document.head.appendChild(s);` });
  await sleep(2000);

  console.log("Start screencast (jpeg q80)...");
  await send("Page.startScreencast", { format: "jpeg", quality: 80, maxWidth: W, maxHeight: H, everyNthFrame: 1 });

  async function scrollAnim(dist, ms) {
    await send("Runtime.evaluate", {
      expression: `(function(){var s=window.scrollY,t=s+${dist},t0=performance.now();(function f(){var p=(performance.now()-t0)/${ms};if(p>=1){window.scrollTo(0,t);return}var e=1-Math.pow(1-p,3);window.scrollTo(0,s+${dist}*e);requestAnimationFrame(f)})()})()`,
    });
  }

  console.log("1/7 Hero"); await sleep(3000);
  console.log("2/7 Projects"); await scrollAnim(800, 4000); await sleep(1500);
  console.log("3/7 Hover"); await send("Runtime.evaluate", { expression: `var c=document.querySelector('.stack-card img');if(c)c.dispatchEvent(new MouseEvent('mouseover',{bubbles:true}))` }); await sleep(2500);
  console.log("4/7 Stack"); await scrollAnim(2400, 8000); await sleep(1000);
  console.log("5/7 About"); await scrollAnim(1600, 5000); await sleep(3000);
  console.log("6/7 Contact"); await scrollAnim(1400, 4500); await sleep(2500);
  console.log("7/7 Submit"); await send("Runtime.evaluate", { expression: `var b=document.querySelector("button[type='submit']");if(b){b.scrollIntoView({block:'center'});b.dispatchEvent(new MouseEvent('mouseover',{bubbles:true}))}` }); await sleep(2000);

  console.log("Stop screencast");
  await send("Page.stopScreencast").catch(() => {});
  await sleep(500);
  ws.close();
  console.log(`Total: ${fc} frames`);

  if (fc === 0) { console.error("NO FRAMES"); return; }

  console.log("Assembling (pipe mode)...");
  const files = readdirSync(OUT_DIR).filter(f => f.endsWith(".jpg")).sort();
  const allData = Buffer.concat(files.map(f => readFileSync(join(OUT_DIR, f))));
  console.log(`  ${files.length} frames, ${Math.round(allData.length / 1024)}KB total`);

  try {
    const result = spawnSync(FFMPEG, [
      "-y",
      "-f", "image2pipe",
      "-framerate", String(CAP_FPS),
      "-i", "-",
      "-c:v", "libvpx",
      "-b:v", "2M",
      "-vf", `scale=${W}:${H}`,
      VIDEO_OUT,
    ], {
      input: allData,
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 60000,
      encoding: "buffer",
    });

    if (result.status === 0) {
      console.log("SAVED:", VIDEO_OUT);
    } else {
      console.error("ffmpeg exit:", result.status);
      console.error("stderr:", result.stderr?.toString()?.substring(0, 400));
      console.log("Frames in:", OUT_DIR);
    }
  } catch (e) {
    console.error("ffmpeg:", e.message?.substring(0, 300));
    console.log("Frames in:", OUT_DIR);
  }
}

main().catch((e) => { console.error("FAIL:", e.message); process.exit(1); });
