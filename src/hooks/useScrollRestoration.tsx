import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { scrollRestorationAtom } from '@/states/scroll-restoration';

export default function useScrollRestoration<U extends HTMLElement>(
  key: string
) {
  const [scrollRestoration, setScrollRestoration] = useAtom(
    scrollRestorationAtom
  );
  const ref = useRef<U | null>(null);

  useEffect(() => {
    setScrollRestoration((prevScrollRestoration) => ({
      ...prevScrollRestoration,
      [key]: 0,
    }));
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const height = ref.current.scrollTop;

      setScrollRestoration((prevScrollRestoration) => ({
        ...prevScrollRestoration,
        [key]: height,
      }));
    };

    ref.current.addEventListener('scroll', handleScroll);
    return () => {
      ref.current?.removeEventListener('scroll', handleScroll);
    };
  }, [ref.current]);

  useEffect(() => {
    if (!ref.current) return;

    if (scrollRestoration && scrollRestoration[key] !== undefined) {
      ref.current?.scrollTo(0, scrollRestoration[key]);
    }
  }, [ref.current]);

  return ref;
}
