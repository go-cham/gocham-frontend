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
    if (!ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const height = ref.current.scrollTop;

      if (!scrollRestoration) {
        setScrollRestoration({
          [key]: height,
        });
      } else {
        setScrollRestoration((prevScrollRestoration) => ({
          ...prevScrollRestoration,
          [key]: height,
        }));
      }
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
