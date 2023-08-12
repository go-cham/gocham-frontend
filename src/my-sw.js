import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', () => {
  self.skipWaiting();
});
