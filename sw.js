/* ============================================================
   CollegeBus — Service Worker v5.6
   Network-First Navigation + Stale-While-Revalidate Static Cache
   + Full Offline PWA Support & Push Notifications
============================================================ */

const CACHE_NAME = 'collegebus-v5.6';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js',
  'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js'
];

// Bypass list for live Firestore & Firebase Auth API requests
const BYPASS_URLS = [
  'firestore.googleapis.com',
  'firebase.googleapis.com',
  'identitytoolkit.googleapis.com',
  'securetoken.googleapis.com',
  'firebaseio.com',
  'google-analytics.com'
];

/* ── INSTALL EVENT: Pre-cache core shell & CDN modules ───────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // Use map with catch so a single offline/CDN failure does not abort install
      await Promise.all(
        PRECACHE_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('[CollegeBus SW] Precache skip:', url, err))
        )
      );
    })
  );
  self.skipWaiting();
});

/* ── ACTIVATE EVENT: Clean up stale caches ───────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[CollegeBus SW] Purging old cache:', k);
          return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

/* ── FETCH EVENT: Resilient Caching Strategy ─────────────────── */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = event.request.url;

  // 1. Direct pass-through for Firebase live databases and auth APIs
  if (BYPASS_URLS.some(domain => url.includes(domain))) {
    return;
  }

  // 2. Navigation Request (HTML Pages): Network-First with Cache Fallback
  // Guarantees users always see the latest version when online, with instant offline support.
  if (event.request.mode === 'navigate' || url.endsWith('/') || url.endsWith('index.html')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          return caches.match('./index.html') || caches.match('./');
        })
    );
    return;
  }

  // 3. Static Assets (CSS, Fonts, Scripts, Images): Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});

/* ── PUSH NOTIFICATIONS ───────────────────────────────────────── */
self.addEventListener('push', event => {
  let data = { title: 'CollegeBus Alert', body: 'New bus update!' };
  try { if (event.data) data = { ...data, ...event.data.json() }; }
  catch(e) { if (event.data) data.body = event.data.text(); }
  
  const options = {
    body: data.body,
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="32" fill="%2310B981"/><text y="130" x="96" font-size="120" text-anchor="middle">🚍</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><text y="80" font-size="80">🚍</text></svg>',
    vibrate: [200, 100, 200],
    tag: 'collegebus-alert',
    renotify: true,
    data: { url: data.url || './' }
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type:'window', includeUncontrolled:true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('collegebus') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
