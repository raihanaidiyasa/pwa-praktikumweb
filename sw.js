const CACHE_NAME = 'pwa-demo-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/styles.css',
    '/app.js',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache terbuka');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response if found
                if (response) {
                    return response;
                }

                // For navigation requests (HTML pages), try to serve index.html or about.html
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html')
                        .then((response) => {
                            if (response) {
                                return response;
                            }
                            // If no cached page is found, fetch from network
                            return fetch(event.request);
                        });
                }

                // For other requests, fetch from network
                return fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});