import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const b = await chromium.launch();
const results = [];
try {
  const context = await b.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const swipe = async (x1, y1, x2, y2) => {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: x1, y: y1 }],
    });
    for (let i = 1; i <= 8; i++) {
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: x1 + ((x2 - x1) * i) / 8, y: y1 + ((y2 - y1) * i) / 8 }],
      });
      await page.waitForTimeout(25);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForTimeout(400);
  };
  for (const [route, selector] of [
    ['/producto', '.mobile-scroll'],
    ['/soluciones', '.mobile-scroll'],
    ['/dudas', '.chat-quick'],
  ]) {
    await page.goto('http://localhost:3137' + route, { waitUntil: 'networkidle' });
    const el = page.locator(selector);
    await el.evaluate((e) => {
      e.scrollLeft = 0;
      e.scrollIntoView({ block: 'center' });
    });
    await page.waitForTimeout(150);
    const rect = await el.boundingBox();
    const y = Math.min(650, Math.max(rect.y + Math.min(90, rect.height / 2), 120));
    await swipe(rect.x + rect.width - 20, y, rect.x + 20, y);
    const x = await el.evaluate((e) => e.scrollLeft);
    assert(x > 20, route + ' swipe horizontal');
    results.push({
      route,
      gesture: 'swipe horizontal táctil sintetizado por CDP',
      scrollLeft: x,
      pass: true,
    });
  }
  await fs.writeFile(
    'reports/mobile/gestures.json',
    JSON.stringify({ engine: 'Chromium', realDevice: false, results }, null, 2),
  );
  console.log(results);
} finally {
  await b.close();
}
