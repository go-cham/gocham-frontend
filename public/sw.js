if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      })
      .then(() => {
        navigator.serviceWorker
          .register('/serviceWorker.js')
          .then((registration) => {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          });
      });
  });
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
