import { chromium } from '@playwright/test';
const base = 'http://localhost:3111';
const b = await chromium.launch();
const results = [];
const ok = (n, c) => {
  results.push((c ? 'OK   ' : 'FALLA ') + n);
};
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
page.on('pageerror', (e) => errs.push(String(e)));

// navegación por el menú + ?go=
await page.goto(base + '/');
await page.hover('header nav a:text-is("Producto")');
await page.click('a:has-text("Planes y precios")');
await page.waitForURL(/producto\?go=/);
await page.waitForTimeout(2200);
const top = await page.evaluate(() => {
  const h = [...document.querySelectorAll('h2,h3')].find((x) =>
    x.textContent.startsWith('Planes claros'),
  );
  return Math.round(h.getBoundingClientRect().top);
});
ok('?go= lleva a "Planes claros" (top≈140, real ' + top + ')', top > 100 && top < 190);

// filtro de catálogo
await page.goto(base + '/producto');
await page.click('button:has-text("Medir")');
const vis = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-testid=catalog] article')].filter(
      (a) => getComputedStyle(a).display !== 'none',
    ).length,
);
ok('filtro Medir muestra 1 tarjeta (' + vis + ')', vis === 1);
await page.click('button:has-text("Todos")');

// chat y FAQ
await page.goto(base + '/dudas');
await page.fill('input[name], input[aria-label="Escribe tu pregunta"]', '¿Cuánto cuesta?');
await page.click('button:has-text("Enviar")');
await page.waitForSelector('[data-testid=typing]', { timeout: 1500 });
ok('indicador "···" visible', true);
await page.waitForFunction(() => document.querySelectorAll('[data-from=bot]').length >= 2, null, {
  timeout: 3000,
});
const txt = await page.textContent('#chat-scroll');
ok('respuesta de precios', txt.includes('$129.000'));
await page.click('button:has-text("¿Cómo empezamos?")');
const open = await page.evaluate(
  () =>
    [...document.querySelectorAll('[id^=faq-a-]')].filter(
      (e) => getComputedStyle(e).display !== 'none',
    ).length,
);
ok('FAQ una sola apertura (' + open + ')', open === 1);

// API real en producción sin Resend: error amable (503); honeypot y validación
const r1 = await page.request.post(base + '/api/contacto', {
  data: { name: 'Luis', email: 'luis@correo.com' },
});
ok(
  'prod sin Resend -> 503 amable',
  r1.status() === 503 && (await r1.json()).error.includes('WhatsApp'),
);
const r2 = await page.request.post(base + '/api/contacto', { data: { name: 'x', email: 'bad' } });
ok('validación servidor 422', r2.status() === 422);
const r3 = await page.request.post(base + '/api/contacto', {
  data: { name: 'Bot', email: 'b@b.co', website: 'spam' },
});
ok('honeypot responde ok sin enviar', r3.status() === 200);
await page.route('**/api/agendar', (r) => r.fulfill({ json: { ok: true } }));
await page.route('**/api/contacto', (r) => r.fulfill({ json: { ok: true } }));
// agendar
await page.goto(base + '/agendar');
await page.waitForTimeout(500);
ok('Confirmar deshabilitado al inicio', await page.isDisabled('[data-testid=confirm]'));
await page.click('button:has-text("Visita a la oficina")');
await page.click('button[aria-pressed]:has-text("10:00")');
await page.fill('input[name=name]', 'Ana Pérez');
await page.fill('input[name=email]', 'ana@correo.com');
ok('Confirmar habilitado', !(await page.isDisabled('[data-testid=confirm]')));
await page.click('[data-testid=confirm]');
await page.waitForSelector('[data-testid=booking-done]');
ok('pantalla de éxito', (await page.textContent('[data-testid=booking-done]')).includes('Ana'));

// contacto
await page.goto(base + '/contacto');
await page.fill('#form input[name=name]', 'Luis');
await page.fill('#form input[name=email]', 'luis@correo.com');
await page.click('#form button[type=submit]');
await page.waitForSelector('[data-testid=contact-success]');
ok('formulario de contacto', true);
// días sin domingo
await page.goto(base + '/agendar');
await page.waitForTimeout(400);
const wds = await page.$$eval('[aria-label=Día] button span:first-child', (e) =>
  e.map((x) => x.textContent),
);
ok('7 días sin domingo ' + wds.join(','), wds.length === 7 && !wds.includes('dom'));

// móvil
const m = await b.newContext({ viewport: { width: 390, height: 844 } });
const mp = await m.newPage();
mp.on('console', (x) => x.type() === 'error' && errs.push('móvil: ' + x.text()));
await mp.goto(base + '/');
await mp.click('button[aria-label="Abrir menú"]');
const hid = () => mp.getAttribute('#mobile-menu', 'aria-hidden');
await mp.waitForTimeout(400);
ok('menú móvil abre', (await hid()) === 'false');
await mp.keyboard.press('Escape');
await mp.waitForTimeout(200);
ok('Esc cierra', (await hid()) === 'true');
await mp.click('button[aria-label="Abrir menú"]');
await mp.click('#mobile-menu a:has-text("Valores")');
await mp.waitForURL(/nosotros/);
await mp.waitForTimeout(500);
ok('navegar cierra el menú', (await hid()) === 'true');
ok('consola sin errores ' + JSON.stringify(errs), errs.length === 0);
console.log(results.join('\n'));
await b.close();
