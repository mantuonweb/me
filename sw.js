const CACHE_NAME = 'mantu-portfolio-v1';
const urlsToCache = [
  '/me/',
  '/me/index.html',
  '/me/styles.css',
  '/me/runtime.js',
  '/me/polyfills.js',
  '/me/main.js',
  '/me/assets/lib/jquery-3.4.1.js',
  '/me/assets/lib/jspdf.min.js',
  '/me/assets/lib/jspdf.plugin.autotable.js',
  '/me/assets/lib/html2canvas.js',
  '/me/assets/lib/metrojs.js'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});