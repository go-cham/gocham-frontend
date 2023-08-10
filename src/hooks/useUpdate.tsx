import { useEffect, useState } from 'react';

import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

export default function useUpdate() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );
  const [showUpdate, setShowUpdate] = useState(false);

  const handleSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowUpdate(true);
    setWaitingWorker(registration.waiting);
  };

  const applyUpdate = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowUpdate(false);
    window.location.reload();
  };

  useEffect(() => {
    if (!navigator.serviceWorker) {
      return;
    }

    serviceWorkerRegistration.register({
      onUpdate: handleSWUpdate,
    });
  }, []);

  return {
    showUpdate,
    applyUpdate,
  };
}
