import { chromium } from '@playwright/test';
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await page.goto('http://localhost:3111/producto', { waitUntil: 'load' });
await page.waitForTimeout(1200);
const st = () =>
  page.evaluate(() => {
    const c = document.querySelector('header canvas');
    return c && { f: +c.dataset.frame, d: c.dataset.dir, op: getComputedStyle(c).opacity };
  });
const r = [];
const ok = (n, c, x = '') => r.push((c ? 'OK   ' : 'FALLA ') + n + ' ' + x);
let s = await st();
ok('(a) scrollY=0 frame 0', s && s.f === 0, JSON.stringify(s));
await page.evaluate(() => window.scrollTo(0, innerHeight * 0.5 + 100));
await page.waitForTimeout(350);
s = await st();
ok('(b) dir=1 al compactar', s.d === '1' && s.f > 0, JSON.stringify(s));
const w = await page.evaluate(() => document.querySelector('header').getBoundingClientRect().width);
ok('header compacto 920px', Math.round(w) === 920, w);
await page.waitForTimeout(3300);
s = await st();
ok('(b2) llega al último fotograma', s.f === 149, JSON.stringify(s));
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(350);
s = await st();
ok('(c) dir=-1 al volver', s.d === '-1' && s.f < 149, JSON.stringify(s));
await page.waitForTimeout(3300);
s = await st();
ok('(c2) regresa a 0', s.f === 0 && s.d === '-1', JSON.stringify(s));
// interrupción
await page.evaluate(() => window.scrollTo(0, innerHeight * 0.5 + 100));
await page.waitForTimeout(1000);
const mid = (await st()).f;
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(150);
const after = await st();
ok(
  '(d) interrupción continúa sin reiniciar',
  mid > 0 && mid < 149 && after.d === '-1' && after.f <= mid + 1 && after.f > 0,
  `mid=${mid} after=${JSON.stringify(after)}`,
);
ok('consola limpia', errs.length === 0, JSON.stringify(errs));
const reqs = [];
console.log(r.join('\n'));
await b.close();
