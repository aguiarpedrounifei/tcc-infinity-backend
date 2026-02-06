const CACHE_NAME = 'infinity-quiz-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.webmanifest'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip API requests (let them fail normally when offline)
    if (request.url.includes('/api/')) {
        return;
    }

    event.respondWith(
        fetch(request)
            .then((response) => {
                // Clone the response to cache it
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Fallback to cache when offline
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Return offline fallback for navigation requests
                    if (request.mode === 'navigate') {
                        return caches.match('/');
                    }
                    return new Response('Offline', { status: 503 });
                });
            })
    );
});

// Handle push notifications (future feature)
self.addEventListener('push', (event) => {
    const data = event.data?.json() ?? {};
    const title = data.title || 'Infinity Quiz';
    const options = {
        body: data.body || 'Nova notificação!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});
