const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

//self luc nay la window obj
const self = this;

//install SW (Service worker)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opend cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//Cache và trả về các request
//Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

//Update service worker
// Active the SW
self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
