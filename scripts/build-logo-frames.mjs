#!/usr/bin/env node
/**
 * Convierte assets/logo-anim.gif en una hoja de sprites WebP + JSON para el logo animado del header.
 *   public/anim/logo-sheet.webp  (cuadrícula de 10 columnas, con alfa)
 *   public/anim/logo-sheet.json  { frames, cols, frameW, frameH, delays[], duration, firstFrameVisible }
 *
 * Uso: npm run logo   (también corre en predev y prebuild).
 * Si no hay GIF: avisa y sale con código 0 (el header usa el logo estático).
 * Variables opcionales: LOGO_GIF (ruta al GIF), LOGO_OUT_DIR (carpeta de salida; por defecto public/anim).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gifPath = path.resolve(root, process.env.LOGO_GIF || 'assets/logo-anim.gif');
const outDir = path.resolve(root, process.env.LOGO_OUT_DIR || 'public/anim');
const MAX_FRAMES = 150;
// Duración objetivo de la animación (ms). Los retardos irregulares del GIF se normalizan a pasos iguales.
const TARGET_MS = Number(process.env.LOGO_DURATION) || 2400;
const MIN_DELAY = 20;
const COLS = 10;
const SLOT_W = 96;
const TARGET_W = SLOT_W * 4; // 384px
const MAX_SIDE = 4096;
const MARGIN = 14; // margen (px del GIF) alrededor del movimiento: ningún fotograma toca el borde
const PAD = 2; // borde transparente alrededor de cada fotograma en la hoja (evita que se mezclen los vecinos)
const ALPHA_MIN = 8;

if (!fs.existsSync(gifPath)) {
  console.warn(
    `[logo] No hay GIF en ${path.relative(root, gifPath)}: se usará el logo estático. (Copia el GIF a assets/logo-anim.gif y ejecuta "npm run logo".)`,
  );
  process.exit(0);
}

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('[logo] sharp no está instalado; se omite la generación de la hoja de sprites.');
  process.exit(0);
}

async function readFrames() {
  const meta = await sharp(gifPath, { animated: true }).metadata();
  const pages = meta.pages ?? 1;
  const delays = (meta.delay ?? []).slice();
  const frames = [];
  for (let i = 0; i < pages; i++) {
    const { data, info } = await sharp(gifPath, { page: i })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    frames.push({
      data,
      w: info.width,
      h: info.height,
      delay: Math.max(MIN_DELAY, delays[i] ?? 100),
    });
  }
  return frames;
}

let frames;
try {
  frames = await readFrames();
} catch (e) {
  console.warn('[logo] sharp no pudo leer el GIF:', e?.message ?? e);
  try {
    const { parseGIF, decompressFrames } = await import('gifuct-js');
    const buf = fs.readFileSync(gifPath);
    const gif = parseGIF(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
    const raw = decompressFrames(gif, true);
    const W = gif.lsd.width;
    const H = gif.lsd.height;
    const canvas = Buffer.alloc(W * H * 4);
    frames = raw.map((f) => {
      if (f.disposalType === 2) canvas.fill(0);
      for (let y = 0; y < f.dims.height; y++)
        for (let x = 0; x < f.dims.width; x++) {
          const s = (y * f.dims.width + x) * 4;
          if (f.patch[s + 3] === 0) continue;
          const d = ((y + f.dims.top) * W + x + f.dims.left) * 4;
          canvas[d] = f.patch[s];
          canvas[d + 1] = f.patch[s + 1];
          canvas[d + 2] = f.patch[s + 2];
          canvas[d + 3] = f.patch[s + 3];
        }
      return {
        data: Buffer.from(canvas),
        w: W,
        h: H,
        delay: Math.max(MIN_DELAY, (f.delay || 10) * (f.delay > 5 ? 1 : 10)),
      };
    });
  } catch (e2) {
    console.warn(
      '[logo] gifuct-js tampoco está disponible o falló; se usará el logo estático.',
      e2?.message ?? '',
    );
    process.exit(0);
  }
}

if (!frames.length) {
  console.warn('[logo] El GIF no tiene fotogramas.');
  process.exit(0);
}

// 0) GIF sin transparencia (arte oscuro sobre fondo claro): se quita el fondo para que el logo
//    se vea sobre el vidrio del header. alpha = 1 - luminosidad/luminosidad_del_fondo, color negro.
{
  const W0 = frames[0].w;
  const fullyOpaque = frames.every((f) => {
    for (let i = 3; i < f.data.length; i += 4) if (f.data[i] < 250) return false;
    return true;
  });
  const bgL =
    frames[0].data[0] * 0.299 + frames[0].data[1] * 0.587 + frames[0].data[2] * 0.114 || 0;
  if (fullyOpaque && bgL > 200 && W0 > 0) {
    for (const f of frames) {
      for (let i = 0; i < f.data.length; i += 4) {
        const l = f.data[i] * 0.299 + f.data[i + 1] * 0.587 + f.data[i + 2] * 0.114;
        const a = Math.max(0, Math.min(1, 1 - l / bgL));
        f.data[i] = f.data[i + 1] = f.data[i + 2] = 0;
        f.data[i + 3] = a < 0.03 ? 0 : Math.round(a * 255);
      }
    }
    console.log('[logo] Fondo claro opaco detectado: se convirtió en transparente.');
  }
}

// 0b) El GIF original saca piezas del lienzo durante la transición (letras que salen por la derecha y un
//     trazo que baja hasta el borde inferior), y eso se ve como cortes y una línea negra. Se define la zona
//     del logo (unión del primer y el último fotograma) y lo que queda fuera se desvanece suavemente.
{
  const FADE_PX = Number(process.env.LOGO_FADE_PX) || 26;
  const ZONE_MARGIN = 8;
  const Wz = frames[0].w;
  const Hz = frames[0].h;
  let zx0 = Wz,
    zy0 = Hz,
    zx1 = -1,
    zy1 = -1;
  for (const f of [frames[0], frames[frames.length - 1]]) {
    for (let y = 0; y < Hz; y++)
      for (let x = 0; x < Wz; x++)
        if (f.data[(y * Wz + x) * 4 + 3] > 128) {
          if (x < zx0) zx0 = x;
          if (x > zx1) zx1 = x;
          if (y < zy0) zy0 = y;
          if (y > zy1) zy1 = y;
        }
  }
  if (zx1 >= 0) {
    zx0 -= ZONE_MARGIN;
    zy0 -= ZONE_MARGIN;
    zx1 += ZONE_MARGIN;
    zy1 += ZONE_MARGIN;
    for (const f of frames) {
      for (let y = 0; y < Hz; y++) {
        const dy = Math.max(zy0 - y, y - zy1, 0);
        for (let x = 0; x < Wz; x++) {
          const dx = Math.max(zx0 - x, x - zx1, 0);
          if (!dx && !dy) continue;
          const o = (y * Wz + x) * 4 + 3;
          if (!f.data[o]) continue;
          const t = Math.max(0, 1 - Math.hypot(dx, dy) / FADE_PX);
          f.data[o] = Math.round(f.data[o] * t * t * (3 - 2 * t));
        }
      }
    }
    console.log(
      `[logo] Zona del logo ${zx1 - zx0 + 1}x${zy1 - zy0 + 1}px; lo que sale de ella se desvanece en ${FADE_PX}px.`,
    );
  }
}

// 1) Recuadro mínimo de píxeles no transparentes, unión de TODOS los fotogramas.
const W = frames[0].w;
const H = frames[0].h;
let x0 = W,
  y0 = H,
  x1 = -1,
  y1 = -1;
for (const f of frames) {
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (f.data[(y * W + x) * 4 + 3] > ALPHA_MIN) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
}
if (x1 < 0) {
  console.warn('[logo] Todos los fotogramas son transparentes; se omite.');
  process.exit(0);
}
x0 = Math.max(0, x0 - MARGIN);
y0 = Math.max(0, y0 - MARGIN);
x1 = Math.min(W - 1, x1 + MARGIN);
y1 = Math.min(H - 1, y1 + MARGIN);
const cw = x1 - x0 + 1;
const ch = y1 - y0 + 1;

// 2) Submuestreo uniforme si hay más de MAX_FRAMES, sumando retardos para conservar la duración.
let picked = frames.map((_, i) => i);
if (frames.length > MAX_FRAMES) {
  picked = Array.from({ length: MAX_FRAMES }, (_, i) =>
    Math.round((i * frames.length) / MAX_FRAMES),
  );
  picked = [...new Set(picked)];
}
const stepMs = Math.max(MIN_DELAY, TARGET_MS / picked.length);
const delays = picked.map(() => stepMs);

// 3) Tamaño de cada fotograma: 4× el slot, sin escalar hacia arriba y con hoja ≤ 4096px.
let fw = Math.min(TARGET_W, cw);
let fh = Math.round((fw * ch) / cw);
const rows = Math.ceil(picked.length / COLS);
const scale = Math.min(1, MAX_SIDE / (fw * COLS), MAX_SIDE / (fh * rows));
fw = Math.max(1, Math.floor(fw * scale));
fh = Math.max(1, Math.floor(fh * scale));

const tiles = [];
const opaque = (buf) => {
  let n = 0;
  for (let i = 3; i < buf.length; i += 4) if (buf[i] > 128) n++;
  return n;
};
for (let n = 0; n < picked.length; n++) {
  const f = frames[picked[n]];
  const png = await sharp(f.data, { raw: { width: W, height: H, channels: 4 } })
    .extract({ left: x0, top: y0, width: cw, height: ch })
    .resize(fw, fh, { fit: 'fill', kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer();
  tiles.push(png);
}
// centro vertical (0..1) del dibujo en el primer fotograma: el header lo usa para centrarlo ópticamente
let ry0 = fh,
  ry1 = -1;
for (let y = 0; y < fh; y++)
  for (let x = 0; x < fw; x++)
    if (tiles[0][(y * fw + x) * 4 + 3] > 40) {
      if (y < ry0) ry0 = y;
      if (y > ry1) ry1 = y;
    }
const restCy = ry1 >= 0 ? (ry0 + ry1 + 1) / 2 / fh : 0.5;
// borde derecho de la tinta (0..1) en el primer y el último fotograma: el header lo usa para que el
// hueco logo→menú sea igual al hueco menú→botón en los dos estados
const inkRight = (tile) => {
  let x1 = -1;
  for (let y = 0; y < fh; y++)
    for (let x = fw - 1; x > x1; x--)
      if (tile[(y * fw + x) * 4 + 3] > 40) {
        x1 = x;
        break;
      }
  return x1 >= 0 ? (x1 + 1) / fw : 1;
};
const inkRightStart = inkRight(tiles[0]);
const inkRightEnd = inkRight(tiles[tiles.length - 1]);
const firstVisible = opaque(tiles[0]) >= 0.6 * opaque(tiles[tiles.length - 1]);

const composites = await Promise.all(
  tiles.map(async (raw, n) => ({
    input: await sharp(raw, { raw: { width: fw, height: fh, channels: 4 } })
      .png()
      .toBuffer(),
    left: (n % COLS) * (fw + 2 * PAD) + PAD,
    top: Math.floor(n / COLS) * (fh + 2 * PAD) + PAD,
  })),
);

fs.mkdirSync(outDir, { recursive: true });
await sharp({
  create: {
    width: (fw + 2 * PAD) * COLS,
    height: (fh + 2 * PAD) * rows,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite(composites)
  .webp({ quality: 92, alphaQuality: 100, effort: 5 })
  .toFile(path.join(outDir, 'logo-sheet.webp'));

const duration = delays.reduce((a, b) => a + b, 0);
fs.writeFileSync(
  path.join(outDir, 'logo-sheet.json'),
  JSON.stringify({
    frames: picked.length,
    cols: COLS,
    frameW: fw,
    frameH: fh,
    delays,
    duration,
    firstFrameVisible: firstVisible,
    restCy,
    inkRightStart,
    inkRightEnd,
    pad: PAD,
  }),
);
console.log(
  `[logo] OK: ${picked.length} fotogramas (${fw}x${fh}), ${duration} ms, primer fotograma visible: ${firstVisible}`,
);
