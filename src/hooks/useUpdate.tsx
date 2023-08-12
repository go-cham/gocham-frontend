import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function useUpdate() {
  const [showUpdate, setShowUpdate] = useState(false);
  const { updateServiceWorker } = useRegisterSW({
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
