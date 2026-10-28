import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const b = await chromium.launch();
const results = [];
try {
  for (const width of [375, 1440]) {
    const ctx = await b.newContext({
      viewport: { width, height: 900 },
      isMobile: width < 900,
      hasTouch: width < 900,
    });
    await ctx.route('**/api/*', (r) => r.fulfill({ json: { ok: true } }));
    const p = await ctx.newPage();
    const errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    for (const route of [
      '/',
      '/producto',
      '/soluciones',
      '/nosotros',
      '/dudas',
      '/contacto',
      '/agendar',
    ]) {
      const response = await p.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      const heading = await p
        .locator('main h1')
        .first()
        .evaluate((e) => getComputedStyle(e).animationName);
      assert.notEqual(heading, 'none', 'h1 debe tener entrada con movimiento permitido');
      await p.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
      });
      await p.waitForTimeout(1000);
      const state = await p.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        pending: document.querySelectorAll('.rv:not(.rv-in)').length,
        marked: document.querySelectorAll('.motion-entered').length,
      }));
      assert(!state.overflow, route + ' horizontal');
      assert.equal(state.pending, 0, route + ' contenido sin revelar');
      results.push({ route, width, heading, ...state });
    }
    await p.goto(base + '/', { waitUntil: 'networkidle' });
    await p.waitForTimeout(250);
    await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await p.waitForTimeout(250);
    if (width < 900)
      assert(
        (
          await p
            .locator('.hc-mesh i')
            .first()
            .evaluate((e) => getComputedStyle(e).animationPlayState)
        )
          .split(',')
          .every((x) => x.trim() === 'paused'),
      );
    await p.goto(base + '/producto', { waitUntil: 'networkidle' });
    await p.getByRole('button', { name: 'Medir', exact: true }).click();
    assert.equal(await p.locator('[data-testid=catalog] article:visible').count(), 1);
    await p.goto(base + '/dudas', { waitUntil: 'networkidle' });
    await p.getByRole('button', { name: '¿Cómo empezamos?', exact: true }).click();
    await p.waitForTimeout(500);
    assert.equal(await p.locator('button[id^=faq-q-][aria-expanded=true]').count(), 1);
    await p.goto(base + '/contacto', { waitUntil: 'networkidle' });
    await p.locator('#form input[name=name]').fill('Prueba');
    await p.locator('#form input[name=email]').fill('test@example.com');
    await p.locator('#form button[type=submit]').click();
    await p.getByTestId('contact-success').waitFor();
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.goto(base + '/producto', { waitUntil: 'networkidle' });
    assert.equal(await p.locator('h1').evaluate((e) => getComputedStyle(e).animationName), 'none');
    assert.equal(await p.evaluate(() => document.documentElement.dataset.motion ?? null), null);
    assert.equal(errors.length, 0, errors.join('\n'));
    await ctx.close();
  }
  const reducedPage = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await reducedPage.goto(base + '/', { waitUntil: 'networkidle' });
  const counter = reducedPage.locator('.stat-b .fz > span').first();
  await counter.scrollIntoViewIfNeeded();
  await reducedPage.waitForTimeout(150);
  await reducedPage.emulateMedia({ reducedMotion: 'reduce' });
  await reducedPage.waitForFunction(
    () => document.querySelector('.stat-b .fz > span')?.textContent === '2.000',
  );
  await reducedPage.close();
  await fs.mkdir('reports/motion', { recursive: true });
  await fs.writeFile(
    'reports/motion/verification.json',
    JSON.stringify(
      {
        results,
        checks: [
          'entradas en 7 rutas a 375 y 1440',
          'sin scroll horizontal',
          'todo el contenido revelado',
          'bucles fuera de pantalla pausados',
          'catálogo y FAQ',
          'contacto simulado',
          'movimiento reducido',
          'sin errores JavaScript',
        ],
      },
      null,
      2,
    ),
  );
  console.log('PASS: movimiento, 14 vistas, controles, pausa y movimiento reducido.');
} finally {
  await b.close();
}
