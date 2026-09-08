const CACHE_NAME = "inventaris-ruangan-v1";

const FILES_TO_CACHE = [
"./",
"./index.html",
"./style.css",
"./script.js",
"./manifest.json",
"./icons/icon-192.png",
"./icons/icon-512.png"
];

// Install Service Worker
self.addEventListener("install", (event) => {
event.waitUntil(
caches.open(CACHE_NAME)
.then((cache) => {
return cache.addAll(FILES_TO_CACHE);
})
.then(() => {
return self.skipWaiting();
})
);
});

// Mengaktifkan Service Worker
self.addEventListener("activate", (event) => {
event.waitUntil(
caches.keys()
.then((cacheNames) => {
return Promise.all(
cacheNames
.filter((cacheName) => {
return cacheName !== CACHE_NAME;
})
.map((cacheName) => {
return caches.delete(cacheName);
})
);
})
.then(() => {
return self.clients.claim();
})
);
});

// Mengambil file dari cache jika tersedia
self.addEventListener("fetch", (event) => {
event.respondWith(
caches.match(event.request)
.then((cachedResponse) => {

            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request)
                .then((networkResponse) => {

                    if (
                        !networkResponse ||
                        networkResponse.status !== 200 ||
                        networkResponse.type !== "basic"
                    ) {
                        return networkResponse;
                    }

                    const responseToCache =
                        networkResponse.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(
                                event.request,
                                responseToCache
                            );
                        });

                    return networkResponse;
                })
                .catch(() => {
                    return caches.match("./index.html");
                });
        })
);

});