import assert from 'node:assert/strict';
import sharp from 'sharp';
import fs from 'node:fs/promises';
const results = [];
for (const name of ['inicio', 'producto']) {
  const before = await sharp(`screenshots/seo/${name}-before-1440.png`)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const after = await sharp(`screenshots/seo/${name}-after-1440.png`)
    .raw()
    .toBuffer({ resolveWithObject: true });
  let changedPixels = 0,
    maxDelta = 0,
    pixelsAboveTolerance = 0;
  if (JSON.stringify(before.info) !== JSON.stringify(after.info))
    throw new Error(`${name}: dimensiones diferentes`);
  for (let i = 0; i < before.data.length; i += before.info.channels) {
    let changed = false,
      pixelDelta = 0;
    for (let c = 0; c < before.info.channels; c++) {
      const d = Math.abs(before.data[i + c] - after.data[i + c]);
      maxDelta = Math.max(maxDelta, d);
      pixelDelta = Math.max(pixelDelta, d);
      if (d) changed = true;
    }
    if (changed) changedPixels++;
    if (pixelDelta > 8) pixelsAboveTolerance++;
  }
  assert.equal(pixelsAboveTolerance, 0, `${name}: diferencia visual superior a 8/255`);
  results.push({
    page: name,
    width: before.info.width,
    height: before.info.height,
    changedPixels,
    maxDelta,
    tolerance: 8,
    pixelsAboveTolerance,
  });
}
await fs.writeFile('screenshots/seo/visual-comparison.json', JSON.stringify(results, null, 2));
console.log(results);
