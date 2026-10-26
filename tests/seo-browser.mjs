import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome' });
const rows = [];
try {
  for (const route of [
    '/',
    '/producto',
    '/soluciones',
    '/nosotros',
    '/dudas',
    '/contacto',
    '/agendar',
  ]) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (['error', 'warning'].includes(m.type())) errors.push(m.text());
    });
    await page.goto('http://localhost:3127' + route, { waitUntil: 'networkidle' });
    const data = await page.evaluate(() => ({
      header: document.querySelectorAll('header').length,
      main: document.querySelectorAll('main').length,
      footer: document.querySelectorAll('footer').length,
      preconnect: [...document.querySelectorAll('link[rel="preconnect"]')].map((x) => x.href),
      preload: [...document.querySelectorAll('link[rel="preload"]')].map((x) => ({
        as: x.as,
        href: x.href,
        imageSrcSet: x.imageSrcset,
      })),
      imageSpace: [...document.images].map((x) => ({
        src: x.currentSrc,
        width: x.getAttribute('width'),
        height: x.getAttribute('height'),
        fill: x.style.position === 'absolute',
        alt: x.alt,
        loading: x.loading,
        fetchPriority: x.fetchPriority,
      })),
      navLinks: [...document.querySelectorAll('nav a')].map((x) => ({
        href: x.getAttribute('href'),
        text: x.textContent.trim(),
      })),
    }));
    assert.deepEqual(errors, []);
    assert.equal(data.main, 1);
    assert.equal(data.header, 1);
    assert.equal(data.footer, 1);
    assert.equal(data.preconnect.length, 0);
    for (const img of data.imageSpace)
      assert(img.fill || (Number(img.width) > 0 && Number(img.height) > 0));
    for (const link of data.navLinks) assert(link.href);
    rows.push({ route, errors, ...data });
    await page.close();
  }
  await fs.writeFile('screenshots/seo/browser-audit.json', JSON.stringify(rows, null, 2));
  console.log(
    'PASS: consola limpia, landmarks, navegación rastreable, espacio de imágenes y sin preconnect externos (7 rutas).',
  );
} finally {
  await browser.close();
}
