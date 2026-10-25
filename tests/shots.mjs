// Capturas de las 7 páginas a 390, 820 y 1440 px -> /screenshots (uso: node tests/shots.mjs [baseUrl])
import { chromium } from '@playwright/test';
import fs from 'node:fs';

const base = process.argv[2] || 'http://localhost:3111';
const pages = {
  inicio: '/',
  producto: '/producto',
  soluciones: '/soluciones',
  nosotros: '/nosotros',
  dudas: '/dudas',
  contacto: '/contacto',
  agendar: '/agendar',
};
const widths = [390, 820, 1440];
fs.mkdirSync('screenshots', { recursive: true });
const browser = await chromium.launch();
const problems = [];
for (const w of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: w < 900 ? 844 : 900 },
    deviceScaleFactor: 1,
  });
  for (const [name, path] of Object.entries(pages)) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errs.push(m.text());
    });
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 500) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    if (over > 0) problems.push(`${name}@${w}: scroll horizontal +${over}px`);
    if (errs.length) problems.push(`${name}@${w}: consola ${errs.join(' | ')}`);
    await page.screenshot({ path: `screenshots/${name}-${w}.png`, fullPage: true });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(
  problems.length ? problems.join('\n') : 'sin problemas de scroll horizontal ni consola',
);
