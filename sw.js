// Vuku PWA - v2
const CACHE_NAME = "vuku-v5";
const urlsToCache = [
    "./",
    "./index.html",
    "./manifest.json",
    "./search-data.json?v=5"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(caches.keys().then(cacheNames => Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                  .map(cacheName => caches.delete(cacheName))
    )));
    return self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
