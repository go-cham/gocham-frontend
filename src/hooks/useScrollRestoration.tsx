import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { scrollRestorationAtom } from '@/states/scroll-restoration';

export default function useScrollRestoration<U extends HTMLElement>(
  key: string,
) {
  const ref = useRef<U | null>(null);
  const [scrollRestoration, setScrollRestoration] = useAtom(
    scrollRestorationAtom,
  );

  useEffect(() => {
    if (!Object.keys(scrollRestoration).includes(key)) {
      setScrollRestoration((prevScrollRestoration) => ({
        ...prevScrollRestoration,
        [key]: 0,
      }));
    } else {
      ref.current?.scrollTo(0, scrollRestoration[key]);
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;
      const scrollTop = ref.current.scrollTop;

      setScrollRestoration((prevScrollRestoration) => ({
        ...prevScrollRestoration,
        [key]: scrollTop,
      }));
    };

    ref.current.addEventListener('scroll', handleScroll);
    return () => {
      ref.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return ref;
}
