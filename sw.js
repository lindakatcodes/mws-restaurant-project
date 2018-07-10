const currentCacheName = 'restaurant-reviews-v2';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(currentCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/sw.js',
                '/css/styles.css',
                '/data/restaurants.json',
                '/restaurant.html',
                '/index.html',
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
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }

            console.log(`Sorry, ${event.request.url} wasn't in the cache! Let me get that for you.`);
            return fetch(event.request);
        }) 
    );
});
