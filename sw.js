// AutoSerwis PWA Service Worker
const CACHE_NAME = 'autoserwis-v2';
// Dynamiczne wykrywanie base path (dla GitHub Pages i innych hostingów z podfolderem)
const BASE_PATH = self.location.pathname.replace(/sw\.js$/, '');
const urlsToCache = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'manifest.json',
  BASE_PATH + 'icons/icon-192.png',
  BASE_PATH + 'icons/icon-512.png'
];

// Instalacja - cache'owanie zasobów
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Aktywacja - czyszczenie starych cache'y
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - strategia Cache First, potem Network
self.addEventListener('fetch', (event) => {
  // Ignoruj nie-GET requesty i zewnętrzne zasoby (fonty Google)
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Dla zewnętrznych zasobów (np. Google Fonts) - network first
  if (url.origin !== location.origin) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Dla lokalnych zasobów - cache first, potem network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // Zwróć z cache, ale też odśwież w tle
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          }).catch(() => {});
          return response;
        }
        
        // Brak w cache - pobierz z sieci i zapisz
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
          return networkResponse;
        });
      })
      .catch(() => {
        // Fallback dla strony głównej
        if (event.request.destination === 'document') {
          return caches.match(BASE_PATH + 'index.html');
        }
      })
  );
});

// Obsługa wiadomości (np. do wymuszenia odświeżenia)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
