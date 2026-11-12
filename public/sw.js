/* Respaldo de navegación. Aumentar la versión cuando cambie cualquier recurso de la lista. */
const CACHE = 'tinto-offline-v2';
const ASSETS = [
  '/offline.html',
  '/error-state.css',
  '/offline-retry.js',
  '/fonts/PlusJakartaSans-Bold.ttf',
  '/images/tinto-logo.png',
  '/icons/icon-192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name.startsWith('tinto-offline-') && name !== CACHE)
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/api/')
  )
    return;
  if (ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => (await cache.match(url.pathname)) || fetch(request)),
    );
    return;
  }
  if (request.mode === 'navigate') {
    // Si la red falla, o no responde en 12 s (señal muy mala), se muestra la página sin conexión de Tinto
    // en lugar de la pantalla gris del navegador.
    const offline = async () => (await caches.open(CACHE)).match('/offline.html');
    const slow = new Promise((resolve) => setTimeout(resolve, 12000, null));
    event.respondWith(
      Promise.race([fetch(request).catch(() => null), slow]).then((res) => res || offline()),
    );
  }
});
