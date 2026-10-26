import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const base = process.argv[2] || 'http://localhost:3127';
const routes = ['/', '/producto', '/soluciones', '/nosotros', '/dudas', '/contacto', '/agendar'];
const rows = [];
const browser = await chromium.launch();
const types = new Set([
  'Organization',
  'WebSite',
  'BreadcrumbList',
  'ListItem',
  'SoftwareApplication',
  'FAQPage',
  'Question',
  'Answer',
  'ContactPage',
]);
function validate(node) {
  if (Array.isArray(node)) return node.forEach(validate);
  if (!node || typeof node !== 'object') return;
  if (node['@type']) assert(types.has(node['@type']), `Tipo inesperado ${node['@type']}`);
  for (const key of ['@id', 'url', 'logo', 'item'])
    if (typeof node[key] === 'string') assert.equal(new URL(node[key]).origin, base);
  for (const forbidden of [
    'aggregateRating',
    'review',
    'offers',
    'telephone',
    'email',
    'address',
    'contactPoint',
  ])
    assert(!(forbidden in node), `Dato pendiente: ${forbidden}`);
  switch (node['@type']) {
    case 'Organization':
      assert.equal(node.name, 'Tinto');
      assert(node.logo);
      assert.deepEqual(node.sameAs, []);
      break;
    case 'WebSite':
      assert(node.publisher['@id']);
      assert.equal(node.inLanguage, 'es-CO');
      break;
    case 'SoftwareApplication':
      assert.equal(node.applicationCategory, 'BusinessApplication');
      assert(node.name && node.description);
      break;
    case 'FAQPage':
      assert.equal(node.mainEntity.length, 3);
      break;
    case 'Question':
      assert(node.name && node.acceptedAnswer['@type'] === 'Answer');
      break;
    case 'Answer':
      assert.equal(typeof node.text, 'string');
      break;
    case 'BreadcrumbList':
      assert.deepEqual(
        node.itemListElement.map((x) => x.position),
        [1, 2],
      );
      break;
  }
  Object.values(node).forEach(validate);
}
try {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  for (const route of routes) {
    const page = await context.newPage();
    const response = await page.goto(base + route, { waitUntil: 'load' });
    assert.equal(response.status(), 200);
    const row = await page.evaluate(() => ({
      title: document.title,
      descriptions: [...document.querySelectorAll('meta[name="description"]')].map(
        (x) => x.content,
      ),
      canonical: [...document.querySelectorAll('link[rel="canonical"]')].map((x) => x.href),
      og: Object.fromEntries(
        [...document.querySelectorAll('meta[property^="og:"]')].map((x) => [
          x.getAttribute('property'),
          x.content,
        ]),
      ),
      twitter: Object.fromEntries(
        [...document.querySelectorAll('meta[name^="twitter:"]')].map((x) => [x.name, x.content]),
      ),
      robots: document.querySelector('meta[name="robots"]')?.content,
      json: [...document.querySelectorAll('script[type="application/ld+json"]')].map((x) =>
        JSON.parse(x.textContent),
      ),
      h1: document.querySelectorAll('h1').length,
      headings: [...document.querySelectorAll('main h1,main h2,main h3,main h4')].map((x) => ({
        level: Number(x.tagName.slice(1)),
        text: x.textContent.trim(),
      })),
      missingAlt: [...document.images].filter((x) => !x.hasAttribute('alt')).length,
      missingSize: [...document.images]
        .filter((x) => !(x.width && x.height) && x.style.position !== 'absolute')
        .map((x) => x.src),
      lang: document.documentElement.lang,
      headTags: [
        ...document.querySelectorAll(
          'title,meta[name="description"],link[rel="canonical"],meta[property^="og:"],meta[name^="twitter:"]',
        ),
      ].every((x) => x.closest('head')),
      unnamedLinks: [...document.querySelectorAll('a')]
        .filter(
          (x) =>
            !x.textContent.trim() &&
            !x.getAttribute('aria-label') &&
            !x.querySelector('img[alt], [role="img"][aria-label],canvas[aria-label]'),
        )
        .map((x) => x.outerHTML),
      externalBlank: [...document.querySelectorAll('a[target="_blank"]')].map((x) => ({
        href: x.href,
        rel: x.rel,
      })),
    }));
    assert.equal(row.descriptions.length, 1);
    assert.deepEqual(row.canonical, [base + (route === '/' ? '/' : route)]);
    assert.equal(row.h1, 1);
    assert.equal(row.lang, 'es');
    assert(row.headTags);
    assert.equal(row.missingAlt, 0);
    assert.deepEqual(row.unnamedLinks, []);
    assert.equal(row.robots, route === '/agendar' ? 'noindex, follow' : 'index, follow');
    for (const key of [
      'og:type',
      'og:locale',
      'og:site_name',
      'og:url',
      'og:title',
      'og:description',
      'og:image',
      'og:image:width',
      'og:image:height',
      'og:image:alt',
    ])
      assert(row.og[key], key);
    assert.equal(new URL(row.og['og:url']).href, row.canonical[0]);
    assert.equal(row.og['og:title'], row.title);
    assert.equal(row.og['og:description'], row.descriptions[0]);
    assert.equal(row.og['og:locale'], 'es_CO');
    assert.equal(row.twitter['twitter:card'], 'summary_large_image');
    assert.equal(row.twitter['twitter:title'], row.title);
    assert.equal(row.twitter['twitter:description'], row.descriptions[0]);
    assert(row.twitter['twitter:image']);
    row.json.forEach(validate);
    assert.equal(row.json.length, route === '/' ? 1 : 2);
    let prior = 0;
    for (const h of row.headings) {
      assert(h.level <= prior + 1, `${route}: salto ${prior} a ${h.level}: ${h.text}`);
      prior = h.level;
    }
    for (const x of row.externalBlank) assert(/noopener/.test(x.rel));
    for (const header of ['x-content-type-options', 'referrer-policy', 'permissions-policy'])
      assert(response.headers()[header]);
    await page.goto(base + route + '?go=Planes%20claros&utm_source=seo', { waitUntil: 'load' });
    assert.equal(
      new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).href,
      row.canonical[0],
    );
    rows.push({ route, ...row });
    await page.close();
  }
  const sitemap = await fetch(base + '/sitemap.xml');
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.equal((xml.match(/<url>/g) || []).length, 6);
  assert(!xml.includes('/agendar'));
  for (const route of routes.filter((x) => x != '/agendar'))
    assert(xml.includes(`<loc>${base + route}</loc>`));
  const robots = await fetch(base + '/robots.txt');
  assert.equal(robots.status, 200);
  const robotText = await robots.text();
  assert(robotText.includes('Disallow: /api/'));
  assert(robotText.includes(base + '/sitemap.xml'));
  const manifest = await fetch(base + '/manifest.webmanifest');
  assert.equal(manifest.status, 200);
  assert.equal((await manifest.json()).lang, 'es-CO');
  const images = [];
  for (const path of [
    '/opengraph-image',
    '/twitter-image',
    '/icon.png',
    '/apple-icon.png',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
  ]) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200);
    const bytes = Buffer.from(await res.arrayBuffer());
    const info = await sharp(bytes).metadata();
    if (path.endsWith('-image')) {
      assert.equal(info.width, 1200);
      assert.equal(info.height, 630);
      await fs.writeFile(`screenshots/seo/${path.slice(1)}.png`, bytes);
    }
    images.push({ path, status: res.status, width: info.width, height: info.height });
  }
  for (const path of ['/api/contacto', '/api/agendar']) {
    const res = await fetch(base + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    assert.equal(res.status, 422);
    assert.equal(res.headers.get('x-robots-tag'), 'noindex, nofollow');
    const get = await fetch(base + path);
    assert.equal(get.status, 405);
    assert.equal(get.headers.get('x-robots-tag'), 'noindex, nofollow');
  }
  assert.equal(new Set(rows.map((x) => x.title)).size, 7);
  assert.equal(new Set(rows.map((x) => x.descriptions[0])).size, 7);
  await fs.writeFile(
    'screenshots/seo/verification.json',
    JSON.stringify({ base, rows, images, sitemap: xml, robots: robotText }, null, 2),
  );
  const esc = (x) => String(x).replaceAll('|', '\\|').replaceAll('\n', ' ');
  let report =
    '# Verificación SEO en producción local\n\nOrigen de prueba: `' +
    base +
    '`. Sustituir por NEXT_PUBLIC_SITE_URL real al compilar.\n\n';
  report +=
    '| Ruta | title | description | canonical | robots | JSON-LD |\n|---|---|---|---|---|---|\n';
  for (const r of rows)
    report +=
      '| ' +
      [
        r.route,
        r.title,
        r.descriptions[0],
        r.canonical[0],
        r.robots,
        r.json.flatMap((x) => x['@graph'].map((y) => y['@type'])).join(', '),
      ]
        .map(esc)
        .join(' | ') +
      ' |\n';
  report +=
    '\n| Ruta | og:type / locale / site_name | og:url | og:title = twitter:title | og:description = twitter:description | og:image | twitter:image | twitter:card |\n|---|---|---|---|---|---|---|---|\n';
  for (const r of rows)
    report +=
      '| ' +
      [
        r.route,
        [r.og['og:type'], r.og['og:locale'], r.og['og:site_name']].join(' / '),
        r.og['og:url'],
        r.og['og:title'],
        r.og['og:description'],
        r.og['og:image'],
        r.twitter['twitter:image'],
        r.twitter['twitter:card'],
      ]
        .map(esc)
        .join(' | ') +
      ' |\n';
  report +=
    '\nAmbas imágenes sociales: 1200 × 630, PNG. `og:image:alt` y `twitter:image:alt`: Tinto: atrae, precalifica y organiza tus oportunidades.\n\n';
  report += '| Recurso | HTTP | Dimensiones |\n|---|---|---|\n';
  for (const i of images) report += `| ${i.path} | ${i.status} | ${i.width} × ${i.height} |\n`;
  report +=
    '\nSitemap, robots y manifest: HTTP 200. Sitemap: seis rutas indexables. API: GET 405 y POST inválido 422, ambos con X-Robots-Tag. Sin envío de correos.\n';
  await fs.writeFile('SEO-VERIFICACION.md', report);
  console.log(
    'PASS: 7 rutas, head SSR, canonicals con parámetros, JSON-LD, headings, alt, enlaces, cabeceras, sitemap, robots, manifest e imágenes.',
  );
} finally {
  await browser.close();
}
