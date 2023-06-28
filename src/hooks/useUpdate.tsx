import { useEffect, useState } from 'react';

export default function useUpdate() {
  const [showUpdate, setShowUpdate] = useState(false);

  const applyUpdate = () => {
    navigator.serviceWorker.getRegistrations().then((regs) =>
      regs.forEach((reg) => {
        reg.waiting?.postMessage({ type: 'SKIP_WAITING' });
      })
    );
  };

  useEffect(() => {
    if (!navigator.serviceWorker) {
      return;
    }
    navigator.serviceWorker.getRegistrations().then((regs) =>
      regs.forEach((reg) => {
        reg
          .update()
          .then(() => {
            if (reg.waiting) {
              setShowUpdate(true);
            }
          })
          .catch((e) => {
            console.error(e);
          });
      })
    );
  }, []);

  return {
    showUpdate,
    applyUpdate,
  };
}
