const currentCacheName = 'restaurant-reviews-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(currentCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/dist/css/styles.css',
                '/dist/js/index.js',
                '/dist/js/restaurant.js',
                '/idb.js',
                '/sw.js',
                '/img/optimized/1-optimized.jpg',
                '/img/optimized/2-optimized.jpg',
                '/img/optimized/3-optimized.jpg',
                '/img/optimized/4-optimized.jpg',
                '/img/optimized/5-optimized.jpg',
                '/img/optimized/6-optimized.jpg',
                '/img/optimized/7-optimized.jpg',
                '/img/optimized/8-optimized.jpg',
                '/img/optimized/9-optimized.jpg',
                '/img/optimized/10-optimized.jpg'
            ]);
        })
    );
});


self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-') && cacheName != currentCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
