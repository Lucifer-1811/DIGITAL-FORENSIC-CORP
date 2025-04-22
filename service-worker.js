const CACHE_NAME = "bbq-site-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "./bbq.html",
  "./bbq.css",
  "./manifest.json",
  "./img/logo.png",
  "./img/about-2.jpg",
  "./img/about-3.jpg",
  "./img/about-4.jpg",
  "./img/about.jpg",
  "./img/dfc1.jpeg",
  "./img/dfc2.jpeg",
  "./img/dfc3.jpeg",
  "./img/dfc4.jpeg",
  "./img/dfc5.jpeg",
  "./img/dfc6.jpeg",
  "./img/dfc7.jpeg",
  "./img/dfc8.jpeg",
  "./img/dfcpng.jpeg",
  "./img/doorstep.jpg",
  "./img/food_1.png",
  "./img/food_2.png",
  "./img/food_3.png",
  "./img/food_4.png",
  "./img/food_5.png",
  "./img/food_6.png",
  "./img/food_7.png",
  "./img/food_8.png",
  "./img/food_9.png",
];

// Install event: cache files
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Service Worker: Caching Files");
      return cache.addAll(cacheAssets);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Removing Old Cache");
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
