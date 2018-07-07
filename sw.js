const currentCacheName = 'restaurant-reviews-v2';

self.addEventListener('install', function(event) {
    console.log('installing service worker...');
    event.waitUntil(
        caches.open(currentCacheName).then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/restaurant.html',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/css/styles.css',
                '/data/restaurants.json'
            ]);
        })
    );
});


self.addEventListener('activate', function(event) {
    console.log('running activation code...');
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
            return response || fetch(event.request);
        })
    );
});