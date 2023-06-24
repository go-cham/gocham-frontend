import { useEffect, useState } from 'react';

import { Banner } from '@/components/Banner';

import App from './App';

export const AppWrapper = () => {
  const [showUpdate, setShowUpdate] = useState(false);

  const applyUpdate = () => {
    console.log('새롭게 받아오기');
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
            // Fetching SW failed.
          });
      })
    );
  }, []);
  return (
    <>
      <Banner show={showUpdate} applyUpdate={applyUpdate} />
      <App />
    </>
  );
};
