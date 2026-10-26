import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
const phase = process.argv[2] || 'before';
const base = process.env.MOBILE_BASE_URL || 'http://localhost:3137';
const dir = process.env.MOBILE_EVIDENCE_DIR || 'C:/Users/LENOVO/tinto-mobile-evidence';
const routes = ['/', '/producto', '/soluciones', '/nosotros', '/dudas', '/contacto', '/agendar'];
const widths = [320, 360, 375, 390, 412, 430, 768, 820];
await fs.mkdir(path.join(dir, phase), { recursive: true });
const browser = await chromium.launch();
const rows = [];
try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: width < 768 ? 800 : 900 },
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      reducedMotion: 'reduce',
      colorScheme: 'light',
    });
    for (const route of routes) {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 35));
        }
        window.scrollTo(0, 0);
        await Promise.all(
          [...document.images].map((i) =>
            Promise.race([i.decode().catch(() => {}), new Promise((r) => setTimeout(r, 1500))]),
          ),
        );
      });
      const data = await page.evaluate(() => {
        const visible = (e) => {
          const s = getComputedStyle(e),
            r = e.getBoundingClientRect();
          return (
            r.width > 0 &&
            r.height > 0 &&
            s.visibility !== 'hidden' &&
            s.display !== 'none' &&
            !e.closest('[inert],[aria-hidden="true"],.sr-only')
          );
        };
        const describe = (e) => ({
          tag: e.tagName,
          class: e.className?.toString().slice(0, 100),
          text: (e.innerText || e.getAttribute('aria-label') || e.getAttribute('name') || '')
            .trim()
            .slice(0, 100),
        });
        const texts = [...document.querySelectorAll('body *')].filter(
          (e) =>
            visible(e) && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()),
        );
        const smallText = texts
          .filter((e) => parseFloat(getComputedStyle(e).fontSize) < 12 - 0.05)
          .map((e) => ({ ...describe(e), size: parseFloat(getComputedStyle(e).fontSize) }));
        const smallBody = texts
          .filter(
            (e) =>
              e.matches('p,[data-from] > div') &&
              parseFloat(getComputedStyle(e).fontSize) < 15 - 0.05,
          )
          .map((e) => ({ ...describe(e), size: parseFloat(getComputedStyle(e).fontSize) }));
        const controls = [
          ...document.querySelectorAll('a[href],button,input:not([type=hidden]),textarea,select'),
        ]
          .filter(visible)
          .filter(
            (e) =>
              e.getBoundingClientRect().right > 0 && e.getBoundingClientRect().left < innerWidth,
          );
        const smallTargets = controls
          .filter((e) => {
            const r = e.getBoundingClientRect();
            return r.width < 43.9 || r.height < 43.9;
          })
          .map((e) => {
            const r = e.getBoundingClientRect();
            return { ...describe(e), width: r.width, height: r.height, disabled: !!e.disabled };
          });
        const clipped = texts
          .filter(
            (e) =>
              e.clientWidth &&
              e.scrollWidth > e.clientWidth + 2 &&
              ['hidden', 'clip'].includes(getComputedStyle(e).overflowX),
          )
          .map(describe);
        const outside = texts
          .filter((e) => {
            const r = e.getBoundingClientRect();
            return (
              (r.left < -0.5 || r.right > innerWidth + 0.5) && !e.closest('[data-mobile-scroll]')
            );
          })
          .map((e) => ({
            ...describe(e),
            left: e.getBoundingClientRect().left,
            right: e.getBoundingClientRect().right,
          }));
        return {
          viewport: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          smallText,
          smallBody,
          smallTargets,
          controls: controls.length,
          clipped,
          outside,
          images: [...document.images].map((i) => ({
            src: i.currentSrc,
            sizes: i.sizes,
            width: i.width,
            height: i.height,
            loading: i.loading,
          })),
          height: document.documentElement.scrollHeight,
        };
      });
      rows.push({ route, width, status: response.status(), errors, ...data });
      await page.screenshot({
        path: path.join(dir, phase, `${route.slice(1) || 'inicio'}-${width}.png`),
        fullPage: true,
        animations: 'disabled',
      });
      await page.close();
    }
    await context.close();
    console.log(phase, width, 'completo');
  }
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    colorScheme: 'light',
  });
  for (const route of ['/', '/producto', '/agendar']) {
    const p = await ctx.newPage();
    await p.goto(base + route, { waitUntil: 'networkidle' });
    await p.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 35));
      }
      window.scrollTo(0, 0);
      await Promise.all(
        [...document.images].map((i) =>
          Promise.race([i.decode().catch(() => {}), new Promise((r) => setTimeout(r, 1500))]),
        ),
      );
    });
    await p.screenshot({
      path: path.join(dir, phase, `${route.slice(1) || 'inicio'}-1440.png`),
      fullPage: true,
      animations: 'disabled',
    });
    await p.close();
  }
  await fs.mkdir('reports/mobile', { recursive: true });
  await fs.writeFile(`reports/mobile/${phase}.json`, JSON.stringify(rows, null, 2));
  console.log(
    JSON.stringify(
      rows.map((r) => ({
        route: r.route,
        width: r.width,
        overflow: r.scrollWidth - r.viewport,
        smallText: r.smallText.length,
        smallTargets: r.smallTargets.length,
        clipped: r.clipped.length,
        outside: r.outside.length,
        errors: r.errors.length,
      })),
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
