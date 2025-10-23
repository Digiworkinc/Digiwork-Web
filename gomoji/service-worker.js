const CACHE_NAME = 'gomoji-cache-v2';
const urlsToCache = [
  './',
  'index.html',
  'index.tsx',
  'manifest.json',
  'metadata.json',
  'types.ts',
  'constants.ts',
  'services/audioService.ts',
  'hooks/useDeviceSensors.ts',
  'hooks/useSpeechRecognition.ts',
  'components/Gomoji.tsx',
  'App.tsx',
  'components/BoredScreen.tsx',
  'components/CodingScreen.tsx',
  'https://cdn.tailwindcss.com',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react@^19.2.0/jsx-runtime',
  'https://aistudiocdn.com/react-dom@^19.2.0/client'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => caches.match('index.html'));
      })
  );
});