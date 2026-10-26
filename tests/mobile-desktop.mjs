import sharp from 'sharp';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const root = process.env.MOBILE_EVIDENCE_DIR || 'C:/Users/LENOVO/tinto-mobile-evidence';
const rows = [];
for (const route of ['inicio', 'producto', 'agendar']) {
  const a = await sharp(`${root}/before/${route}-1440.png`)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const b = await sharp(`${root}/after/${route}-1440.png`)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const sameDimensions = JSON.stringify(a.info) === JSON.stringify(b.info);
  let changedPixels = 0,
    pixelsAboveTolerance = 0,
    maxDelta = 0;
  if (sameDimensions) {
    for (let i = 0; i < a.data.length; i += a.info.channels) {
      let d = 0;
      for (let c = 0; c < a.info.channels; c++)
        d = Math.max(d, Math.abs(a.data[i + c] - b.data[i + c]));
      maxDelta = Math.max(maxDelta, d);
      if (d) changedPixels++;
      if (d > 8) pixelsAboveTolerance++;
    }
  }
  rows.push({
    route,
    width: a.info.width,
    heightBefore: a.info.height,
    heightAfter: b.info.height,
    sameDimensions,
    changedPixels,
    maxDelta,
    tolerance: 8,
    pixelsAboveTolerance,
  });
}
await fs.writeFile('reports/mobile/desktop.json', JSON.stringify(rows, null, 2));
console.log(rows);
assert(
  rows.every((x) => x.sameDimensions && x.pixelsAboveTolerance === 0),
  'Cambios de escritorio fuera de tolerancia',
);
