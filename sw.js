const currentCacheName = 'restaurant-reviews-v1';

self.addEventListener('install', function(event) {
    console.log('installing service worker...');
    event.waitUntil(
        caches.open(currentCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/css/styles.css',
                '/data/restaurants.json',
                '/restaurant.html?id=1',
                '/restaurant.html?id=2',
                '/restaurant.html?id=3',
                '/restaurant.html?id=4',
                '/restaurant.html?id=5',
                '/restaurant.html?id=6',
                '/restaurant.html?id=7',
                '/restaurant.html?id=8',
                '/restaurant.html?id=9',
                '/restaurant.html?id=10',
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
