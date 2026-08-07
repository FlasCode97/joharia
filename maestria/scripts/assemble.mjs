import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const OUT_DIR = join(process.env.TEMP || "C:\\Temp", "maestria-frames");
const VIDEO_OUT = join(process.env.TEMP || "C:\\Temp", "maestria-demo.webp");
const FPS = 12;

async function main() {
  const files = readdirSync(OUT_DIR).filter(f => f.endsWith(".jpg")).sort();
  console.log(`Found ${files.length} frames`);

  if (files.length === 0) { console.error("NO FRAMES"); return; }

  // Resize all to 960x540 (smaller to avoid webp "too large" limit)
  const small = 960, sh = 540;
  const resized = [];
  for (let i = 0; i < files.length; i++) {
    const buf = readFileSync(join(OUT_DIR, files[i]));
    const r = await sharp(buf).resize(small, sh, { fit: "cover" }).raw().toBuffer();
    resized.push(r);
    if (i % 10 === 0) console.log(`  resized ${i + 1}/${files.length}`);
  }
  console.log(`Resized ${resized.length} frames to ${small}x${sh}`);

  // Create animated webp from raw frames
  const totalBytes = resized.reduce((a, b) => a + b.length, 0);
  console.log(`Total raw bytes: ${(totalBytes / 1024 / 1024).toFixed(1)}MB`);

  // Composite frames into a single tall image, then let sharp create webp
  // Actually, use sharp's join feature: create a vertical strip
  const stripHeight = sh * resized.length;
  const strip = Buffer.concat(resized);
  console.log(`Strip: ${small}x${stripHeight}`);

  await sharp(strip, {
    raw: { width: small, height: stripHeight, channels: 3 },
  })
    .webp({ quality: 60 })
    .toFile(VIDEO_OUT + ".strip.webp");

  console.log("Strip saved:", VIDEO_OUT + ".strip.webp");

  // Alternative: save each frame as individual webp and note the path
  // For now, also create a simple MJPEG video (concatenated JPEGs with AVI header)
  const frames = resized.map((raw, i) =>
    sharp(raw, { raw: { width: small, height: sh, channels: 3 } }).jpeg({ quality: 70 }).toBuffer()
  );
  const jpegFrames = await Promise.all(frames);
  console.log(`Created ${jpegFrames.length} jpeg frames`);

  // Write as MJPEG AVI (simple container)
  const delayMs = Math.round(1000 / FPS);
  // AVI is complex. Instead, write a simple .mjpeg file (just concatenated JFIF)
  const mjpegOut = VIDEO_OUT.replace(".webp", ".mjpeg");
  const combined = Buffer.concat(jpegFrames);
  writeFileSync(mjpegOut, combined);
  console.log("MJPEG saved:", mjpegOut, `(${(combined.length / 1024 / 1024).toFixed(1)}MB)`);

  // Also try sharp animated webp with small frames
  try {
    const smallFrames = await Promise.all(
      jpegFrames.map(f => sharp(f).resize(480, 270).jpeg({ quality: 60 }).toBuffer())
    );
    await sharp(smallFrames, { animated: true })
      .webp({ quality: 50, loop: 0, delay: delayMs })
      .toFile(VIDEO_OUT);
    console.log("ANIMATED WEBP saved:", VIDEO_OUT);
  } catch (e) {
    console.error("Animated webp failed:", e.message);
  }
}

main().catch((e) => { console.error("FAIL:", e.message); process.exit(1); });
