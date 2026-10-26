import { chromium } from '@playwright/test';
import fs from 'node:fs';
const phase = process.argv[2] || 'before';
fs.mkdirSync('screenshots/seo', { recursive: true });
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    colorScheme: 'light',
  });
  for (const [name, path] of [
    ['inicio', '/'],
    ['producto', '/producto'],
  ]) {
    const page = await context.newPage();
    await page.goto('http://localhost:3127' + path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
      await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
    });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `screenshots/seo/${name}-${phase}-1440.png`,
      fullPage: true,
      animations: 'disabled',
    });
    console.log(name, phase, await page.locator('h1,h2,h3,h4').allTextContents());
    await page.close();
  }
} finally {
  await browser.close();
}
