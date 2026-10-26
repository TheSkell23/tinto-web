import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const b = await chromium.launch();
const rows = [];
try {
  const context = await b.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });
  const p = await context.newPage();
  const cdp = await context.newCDPSession(p);
  for (const route of [
    '/',
    '/producto',
    '/soluciones',
    '/nosotros',
    '/dudas',
    '/contacto',
    '/agendar',
  ]) {
    await p.goto('http://localhost:3137' + route, { waitUntil: 'networkidle' });
    const inputs = await p
      .locator('input:not([name=website]),textarea')
      .evaluateAll((xs) =>
        xs.map((e) => ({
          name: e.name || e.getAttribute('aria-label'),
          font: parseFloat(getComputedStyle(e).fontSize),
          type: e.type,
          inputMode: e.inputMode,
          autocomplete: e.autocomplete,
          enterKeyHint: e.enterKeyHint,
        })),
      );
    assert(inputs.every((x) => x.font >= 16));
    for (const width of [
      321, 359, 374, 411, 429, 519, 520, 521, 600, 767, 769, 819, 821, 898, 899,
    ]) {
      await p.setViewportSize({ width, height: 812 });
      const size = await p.evaluate(() => ({
        inner: innerWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      assert(size.scroll <= size.inner, `${route} @${width}`);
    }
    rows.push({ route, additionalWidths: 15, inputs, pass: true });
  }
  await p.setViewportSize({ width: 375, height: 812 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.goto('http://localhost:3137/', { waitUntil: 'networkidle' });
  const perf = await p.evaluate(async () => {
    const intervals = [];
    let last = performance.now(),
      start = last;
    await new Promise((resolve) => {
      function step(now) {
        intervals.push(now - last);
        last = now;
        window.scrollTo(0, (now - start) * 1.4);
        if (now - start < 1800) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
    const sorted = intervals.sort((a, b) => a - b);
    const hero = [...document.images].find((x) => x.currentSrc.includes('hero-inicio'));
    const entry = hero && performance.getEntriesByName(hero.currentSrc).at(-1);
    return {
      cpuThrottle: 4,
      frames: intervals.length,
      p95FrameMs: sorted[Math.floor(sorted.length * 0.95)],
      maxFrameMs: sorted.at(-1),
      hero: hero
        ? { src: hero.currentSrc, renderedWidth: hero.width, bytes: entry?.encodedBodySize }
        : null,
      viewportMeta: document.querySelector('meta[name=viewport]')?.content,
    };
  });
  await fs.writeFile(
    'reports/mobile/extra-checks.json',
    JSON.stringify({ rows, performanceSimulation: perf }, null, 2),
  );
  console.log('PASS: 105 casos adicionales sin scroll, campos >=16px. Simulación:', perf);
} finally {
  await b.close();
}
