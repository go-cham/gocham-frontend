import { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';

import character from '@/common/assets/images/background/character.svg';
import text from '@/common/assets/images/background/text.svg';

import { PhoneFrame } from './PhoneFrame';

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const handleResize = () => {
        if (ref.current) {
          ref.current.style.transform = `scale(${
            document.body.getBoundingClientRect().height / 1012
          })`;
        }
      };
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [ref.current]);

  return (
    <div className="flex h-full w-screen overflow-hidden bg-[#f5f5f5] bg-cover bg-center">
      <img
        src={text}
        alt="text"
        className="fixed left-[5.5%] top-[10vh] z-10 hidden w-[38rem] xl:block"
      />
      <img
        src={character}
        alt="character"
        className="fixed bottom-0 left-0 hidden w-[45%] xl:block"
      />
      {isMobile ? (
        <div className="relative mx-auto h-full w-full bg-white">
          {children}
        </div>
      ) : (
        <div className="fixed -top-[0.3%] left-1/2 h-[90vh] w-[53rem] -translate-x-[55%] xl:-translate-x-0">
          <div
            ref={ref}
            style={{
              transform: `scale(${
                document.body.getBoundingClientRect().height / 1012
              })`,
              transformOrigin: 'top left',
            }}
          >
            <PhoneFrame className="pointer-events-none absolute left-0 top-0 z-[9999]" />
            <div className="absolute left-[24.6%] top-[2.4rem] h-[5rem] w-[83.0%] bg-white" />
            <div className="absolute left-[24.4%] top-[6.3rem] h-[92.4rem] w-[84%] overflow-hidden bg-white">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
