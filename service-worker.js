/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-1617a51';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./spanelske_pohadky_002.html","./spanelske_pohadky_005.html","./spanelske_pohadky_006.html","./spanelske_pohadky_007.html","./spanelske_pohadky_008.html","./spanelske_pohadky_009.html","./spanelske_pohadky_010.html","./spanelske_pohadky_011.html","./spanelske_pohadky_012.html","./spanelske_pohadky_013.html","./spanelske_pohadky_014.html","./spanelske_pohadky_015.html","./spanelske_pohadky_016.html","./spanelske_pohadky_017.html","./spanelske_pohadky_018.html","./spanelske_pohadky_019.html","./spanelske_pohadky_020.html","./spanelske_pohadky_021.html","./spanelske_pohadky_022.html","./spanelske_pohadky_023.html","./spanelske_pohadky_024.html","./spanelske_pohadky_025.html","./spanelske_pohadky_026.html","./spanelske_pohadky_027.html","./spanelske_pohadky_028.html","./spanelske_pohadky_029.html","./spanelske_pohadky_030.html","./spanelske_pohadky_031.html","./spanelske_pohadky_032.html","./spanelske_pohadky_033.html","./spanelske_pohadky_034.html","./spanelske_pohadky_035.html","./spanelske_pohadky_036.html","./spanelske_pohadky_037.html","./spanelske_pohadky_038.html","./spanelske_pohadky_039.html","./spanelske_pohadky_040.html","./spanelske_pohadky_041.html","./spanelske_pohadky_042.html","./spanelske_pohadky_043.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/mzk_logo_tyrkys_transparent.jpg","./resources/obalka_spanelske_pohadky.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./template-images/circles.png","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
