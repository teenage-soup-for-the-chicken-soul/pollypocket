var appRequest = new Request('/home', { credentials: 'include' });

var CACHE_NAME = 'pollyPocket-v1';
var urlsToCache = [
  appRequest,
  '/',
  '/style.css',
  '/bundle.js',
  '/assets/logos/purplesmall.png',
  '/assets/images/homepageDesktop.png',
  '/favicon.ico',
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Open a cache and cache our files
      return cache.addAll(urlsToCache);
    })
  );
});

var doesRequestAcceptHtml = function(request) {
  return request.headers
    .get('Accept')
    .split(',')
    .some(function(type) {
      return type === 'text/html';
    });
};

self.addEventListener('fetch', function(event) {
  var request = event.request;
  if (doesRequestAcceptHtml(request)) {
    // HTML pages fallback to offline page
    try {
      event.respondWith(
        fetch(request).catch(function() {
          return caches.match('/');
        })
      );
    } catch (error) {
      console.log(error);
      console.log('fail on offline fetch ' + request);
    }
  } else {
    // Default fetch behaviour
    // Cache first for all other requests
    event.respondWith(
      caches.match(request).then(function(response) {
        if (response) {
          return response;
        }
        try {
          return fetch(request);
        } catch (error) {
          console.log(error);
          console.log("couldn't fetch " + request);
        }
      })
    );
  }
});
