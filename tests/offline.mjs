import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
const captures = process.env.TEST_ARTIFACT_DIR || path.join(os.tmpdir(), 'tinto-offline-captures');
await fs.mkdir(captures, { recursive: true });
const base = process.argv[2] || process.env.TEST_BASE_URL || 'http://localhost:3000';
const b = await chromium.launch();
const passed = [];
try {
  const context = await b.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });
  const p = await context.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  const check = (name, value) => {
    assert(value, name);
    passed.push(name);
  };
  await p.goto(base + '/contacto', { waitUntil: 'networkidle' });
  await p.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise((resolve) =>
        navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }),
      );
  });
  check(
    'worker instalado y controlando',
    await p.evaluate(() => !!navigator.serviceWorker.controller),
  );
  await p.locator('#form input[name=name]').fill('Ana Local');
  await context.setOffline(true);
  await p.getByRole('dialog', { name: 'Nos quedamos sin conexión.' }).waitFor();
  check('aviso inmediato al perder red', true);
  check(
    'el formulario conserva sus datos',
    (await p.locator('#form input[name=name]').inputValue()) === 'Ana Local',
  );
  check(
    'foco dentro del aviso',
    await p
      .getByRole('button', { name: 'Volver a intentar', exact: true })
      .evaluate((e) => e === document.activeElement),
  );
  await context.setOffline(false);
  await p.getByRole('dialog').waitFor({ state: 'hidden' });
  check(
    'recuperación sin borrar el formulario',
    (await p.locator('#form input[name=name]').inputValue()) === 'Ana Local',
  );
  const missing = await p.goto(base + '/esta-pagina-no-existe', { waitUntil: 'networkidle' });
  check('ruta inexistente devuelve HTTP 404', missing.status() === 404);
  check('404 con un solo h1', (await p.locator('h1').count()) === 1);
  check(
    '404 en noindex',
    await p
      .locator('meta[name=robots]')
      .evaluateAll((xs) => xs.some((e) => e.content.includes('noindex'))),
  );
  console.log('Título 404:', await p.title());
  await p.getByRole('link', { name: 'Volver al inicio', exact: true }).click();
  await p.waitForURL(base + '/');
  check('enlace de recuperación al inicio', true);
  await context.setOffline(true);
  await p.goto(base + '/producto', { waitUntil: 'load' });
  await p.locator('#retry').waitFor();
  check('recarga/ruta sin red usa HTML guardado', (await p.title()) === 'Sin conexión | Tinto');
  await Promise.all([p.waitForEvent('load'), p.locator('#retry').click()]);
  check('reintentar sin red mantiene respaldo', await p.locator('#retry').isVisible());
  check(
    'CSS y fuente disponibles sin red',
    await p
      .locator('h1')
      .evaluate(
        (e) =>
          getComputedStyle(e).fontSize === '30px' &&
          getComputedStyle(e).fontFamily.includes('TintoOffline'),
      ),
  );
  const post = await p.evaluate(async () => {
    try {
      await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      });
      return false;
    } catch {
      return true;
    }
  });
  check('POST no se simula como éxito offline', post);
  const cached = await p.evaluate(async () => {
    const cache = await caches.open('tinto-offline-v1');
    return (await cache.keys()).map((x) => new URL(x.url).pathname);
  });
  check(
    'solo recursos de respaldo en caché',
    cached.length === 6 && !cached.some((x) => x.startsWith('/api/') || x === '/contacto'),
  );
  await context.setOffline(false);
  await p.waitForFunction(() => document.querySelector('h1')?.textContent?.includes('Un CRM'));
  check('al volver la red recupera la URL solicitada', p.url() === base + '/producto');
  await fs.mkdir('reports/offline', { recursive: true });
  for (const width of [320, 375, 1440]) {
    await p.setViewportSize({ width, height: 900 });
    for (const path of ['/esta-pagina-no-existe', '/offline.html']) {
      await p.goto(base + path, { waitUntil: 'networkidle' });
      check(
        `sin desborde ${path} @${width}`,
        await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      );
      await p.screenshot({
        path: `${captures}/${path.includes('offline') ? 'offline' : '404'}-${width}.png`,
        fullPage: true,
      });
    }
  }
  check('sin errores de JavaScript', errors.length === 0);
  await fs.writeFile(
    'reports/offline/verification.json',
    JSON.stringify({ passed, cached, errors }, null, 2),
  );
  console.log(passed.map((x) => 'PASS ' + x).join('\n'));
} finally {
  await b.close();
}
