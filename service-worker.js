const CACHE_NAME = "bbq-site-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/bbq.html",
  "/bbq.css",
  "/manifest.json",
  "/img/logo.png",
  "/img/about-2.jpg",
  "/img/about-3.jpg",
  "/img/about-4.jpg",
  "/img/about.jpg",
  "/img/dfc1.jpeg",
  "/img/dfc2.jpeg",
  "/img/dfc3.jpeg",
  "/img/dfc4.jpeg",
  "/img/dfc5.jpeg",
  "/img/dfc6.jpeg",
  "/img/dfc7.jpeg",
  "/img/dfc8.jpeg",
  "/img/dfcpng.jpeg",
  "/img/doorstep.jpg",
  "/img/food_1.png",
  "/img/food_2.png",
  "/img/food_3.png",
  "/img/food_4.png",
  "/img/food_5.png",
  "/img/food_6.png",
  "/img/food_7.png",
  "/img/food_8.png",
  "/img/food_9.png",
];

// Install event: cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Caching assets");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Fetch event: serve cached content
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(
          () => caches.match("/bbq.html") // fallback when offline
        )
      );
    })
  );
});
