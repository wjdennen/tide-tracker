const CACHE = 'tidewatch-v9';
const SHELL = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];

// Install: cache the app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

// Activate: clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: app shell from cache, API calls always from network
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Always fetch NOAA and NWS data fresh from network
  if (url.hostname.includes('noaa.gov') || url.hostname.includes('weather.gov') ||
      url.hostname.includes('arcgisonline.com') || url.hostname.includes('googleapis.com') ||
      url.hostname.includes('unpkg.com')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // App shell: cache-first, fall back to network
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});
