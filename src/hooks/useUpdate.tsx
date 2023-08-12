import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const UPDATE_INTERVAL = 60 * 60 * 1000;

export default function useUpdate() {
  const [showUpdate, setShowUpdate] = useState(false);
  const { updateServiceWorker } = useRegisterSW({
    onRegistered: (r) => {
      r &&
        setInterval(() => {
          r.update();
        }, UPDATE_INTERVAL);
    },
    onNeedRefresh: () => {
      setShowUpdate(true);
    },
  });

  const applyUpdate = () => {
    setShowUpdate(false);
    updateServiceWorker(true);
  };

  return {
    showUpdate,
    applyUpdate,
  };
}
