/* ============================================================
   CollegeBus — Service Worker v5.5
   Handles offline caching + push notifications
============================================================ */

const CACHE_NAME = 'collegebus-v5.5';
const CACHE_FILES = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = event.request.url;
  if (url.includes('firestore.googleapis.com') || url.includes('firebase.googleapis.com') || url.includes('identitytoolkit.googleapis.com')) return;
  
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});

self.addEventListener('push', event => {
  let data = { title: 'CampusBus Alert', body: 'New bus update!' };
  try { if (event.data) data = { ...data, ...event.data.json() }; }
  catch(e) { if (event.data) data.body = event.data.text(); }
  const options = {
    body: data.body,
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="32" fill="%2310B981"/><text y="130" x="96" font-size="120" text-anchor="middle">🚍</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><text y="80" font-size="80">🚍</text></svg>',
    vibrate: [200, 100, 200],
    tag: 'campusbus-alert',
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
        if (client.url.includes('campusbus') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
