import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.MOBILE_BASE_URL || 'http://localhost:3137';
const browser = await chromium.launch();
const passed = [];
const errors = [];
let bookings = 0,
  contacts = 0;
try {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
  });
  await context.route('**/api/*', (r) => {
    const url = new URL(r.request().url());
    if (url.pathname === '/api/agendar') bookings++;
    if (url.pathname === '/api/contacto') contacts++;
    return r.fulfill({ json: { ok: true } });
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  const ok = (name, value) => {
    assert(value, name);
    passed.push(name);
  };
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).tap();
  ok('tap abre menú', (await page.locator('#mobile-menu').getAttribute('aria-hidden')) === 'false');
  ok(
    'bloqueo scroll de fondo',
    await page.evaluate(() => document.documentElement.style.overflow === 'hidden'),
  );
  await page.keyboard.press('Shift+Tab');
  ok(
    'foco permanece en navegación',
    await page.evaluate(() => document.activeElement?.closest('header,#mobile-menu') !== null),
  );
  await page.keyboard.press('Escape');
  ok(
    'Escape cierra menú',
    (await page.locator('#mobile-menu').getAttribute('aria-hidden')) === 'true',
  );
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).tap();
  await page.getByRole('button', { name: 'Cerrar menú', exact: true }).tap();
  ok(
    'tap en hamburguesa cierra',
    (await page.locator('#mobile-menu').getAttribute('aria-hidden')) === 'true',
  );
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).tap();
  await page
    .locator('#mobile-menu > div')
    .first()
    .tap({ position: { x: 2, y: 150 } });
  ok(
    'tap fuera cierra',
    (await page.locator('#mobile-menu').getAttribute('aria-hidden')) === 'true',
  );
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).tap();
  await page.locator('#mobile-menu a').filter({ hasText: 'Planes y precios' }).tap();
  await page.waitForURL(/producto\?go=/);
  await page.waitForTimeout(2000);
  ok(
    'navegar cierra menú',
    (await page.locator('#mobile-menu').getAttribute('aria-hidden')) === 'true',
  );
  const offset = await page.evaluate(() => {
    const h = [...document.querySelectorAll('h2,h3')].find((x) =>
      x.textContent.trim().startsWith('Planes claros'),
    );
    return {
      heading: h.getBoundingClientRect().top,
      header: document.querySelector('header').getBoundingClientRect().bottom,
    };
  });
  ok(
    'offset móvil sigue altura real del header',
    Math.abs(offset.heading - offset.header - 16) < 7,
  );
  await page.goto(base + '/producto', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Medir', exact: true }).tap();
  ok(
    'filtro del catálogo',
    (await page.locator('[data-testid=catalog] article:visible').count()) === 1,
  );
  const table = page.locator('.mobile-scroll');
  await table.scrollIntoViewIfNeeded();
  const sc = await table.evaluate((e) => {
    e.scrollLeft = e.scrollWidth;
    return { x: e.scrollLeft, max: e.scrollWidth - e.clientWidth };
  });
  ok('tabla se desplaza internamente', sc.x > 0 && Math.abs(sc.x - sc.max) < 2);
  await page.goto(base + '/dudas', { waitUntil: 'networkidle' });
  const input = page.getByRole('textbox', { name: 'Escribe tu pregunta' });
  await input.scrollIntoViewIfNeeded();
  await input.fill('¿Cuánto cuesta?');
  await page.getByRole('button', { name: 'Enviar', exact: true }).tap();
  const beforeY = await page.evaluate(() => scrollY);
  await page.waitForFunction(() => document.querySelectorAll('[data-from=bot]').length >= 2);
  ok(
    'chat responde',
    await page
      .locator('#chat-scroll')
      .textContent()
      .then((x) => x.includes('$129.000')),
  );
  ok('autoscroll no mueve la página', Math.abs((await page.evaluate(() => scrollY)) - beforeY) < 2);
  await page.getByRole('button', { name: '¿Cómo empezamos?', exact: true }).tap();
  ok('FAQ conserva una apertura', (await page.locator('[id^=faq-a-]:visible').count()) === 1);
  // Viewport corto aproxima espacio disponible con teclado, sin afirmar emulación de teclado nativo.
  await page.setViewportSize({ width: 375, height: 480 });
  await input.scrollIntoViewIfNeeded();
  await input.focus();
  ok(
    'input del chat visible en viewport corto',
    await input.evaluate((e) => {
      const r = e.getBoundingClientRect();
      return r.top >= 0 && r.bottom <= innerHeight;
    }),
  );
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(base + '/agendar', { waitUntil: 'networkidle' });
  ok('confirmación deshabilitada al inicio', await page.getByTestId('confirm').isDisabled());
  await page.getByRole('group', { name: 'Día', exact: true }).locator('button').nth(1).tap();
  await page
    .getByRole('group', { name: 'Hora', exact: true })
    .locator('button:not(:disabled)')
    .first()
    .tap();
  await page.locator('input[name=name]').fill('Ana Prueba');
  await page.locator('input[name=email]').fill('ana@example.com');
  await page.locator('input[name=phone]').fill('+573000000000');
  ok('confirmación habilitada al completar datos', await page.getByTestId('confirm').isEnabled());
  await page.getByTestId('confirm').tap();
  await page.getByTestId('booking-done').waitFor();
  ok(
    'reserva simulada muestra éxito',
    await page
      .getByTestId('booking-done')
      .textContent()
      .then((x) => x.includes('Ana')),
  );
  await page.goto(base + '/contacto', { waitUntil: 'networkidle' });
  await page.locator('#form input[name=name]').fill('Luis Prueba');
  await page.locator('#form input[name=email]').fill('luis@example.com');
  await page.locator('#form textarea').fill('Prueba local interceptada');
  await page.locator('#form button[type=submit]').tap();
  await page.getByTestId('contact-success').waitFor();
  ok('contacto simulado muestra éxito', true);
  ok('ningún envío real; endpoints interceptados', bookings === 1 && contacts === 1);
  ok('sin errores de consola', errors.length === 0);
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const logo = await page
    .locator('header canvas')
    .evaluateAll((cs) =>
      cs.map((c) => ({
        width: c.width,
        height: c.height,
        painted: [...c.getContext('2d').getImageData(0, 0, c.width, c.height).data].some(
          (v, i) => i % 4 === 3 && v > 0,
        ),
      })),
    );
  ok('canvas del logo pintado', logo.length > 0 && logo.every((x) => x.painted));
  await page.evaluate(() => scrollTo(0, 600));
  await page.waitForTimeout(1000);
  ok(
    'header compacto en móvil',
    (await page.locator('header').getAttribute('data-compact')) === 'true',
  );
  const menu = page.getByRole('button', { name: 'Abrir menú', exact: true });
  await menu.tap();
  const menuBox = await page.locator('#mobile-menu [role=dialog]').boundingBox();
  ok('menú cabe en dvh', menuBox.y >= 0 && menuBox.y + menuBox.height <= 813);
  await fs.mkdir('reports/mobile', { recursive: true });
  await fs.writeFile(
    'reports/mobile/functional.json',
    JSON.stringify(
      {
        viewport: 375,
        hasTouch: true,
        isMobile: true,
        passed,
        errors,
        bookings,
        contacts,
        offset,
        logo,
      },
      null,
      2,
    ),
  );
  console.log(passed.map((x) => 'PASS ' + x).join('\n'));
} finally {
  await browser.close();
}
