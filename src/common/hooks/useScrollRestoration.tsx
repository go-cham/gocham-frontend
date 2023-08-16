import { useAtom } from 'jotai';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { scrollRestorationAtom } from '@/common/states/scroll-restoration';

export function useScrollRestoration<U extends HTMLElement>(key: string) {
  const [scrollRestoration, setScrollRestoration] = useAtom(
    scrollRestorationAtom,
  );
  const [node, setNode] = useState<U | null>(null);
  const ref = useCallback((node: U | null) => {
    if (node) {
      setNode(node);
    }
  }, []);

  useEffect(() => {
    if (!node) return;

    if (Object.keys(scrollRestoration).includes(key)) {
      node.scrollTo(0, scrollRestoration[key]);
    } else {
      setScrollRestoration((prevScrollRestoration) => ({
        ...prevScrollRestoration,
        [key]: 0,
      }));
    }

    const handleScroll = debounce(() => {
      const scrollTop = node.scrollTop;

      setScrollRestoration((prevScrollRestoration) => ({
        ...prevScrollRestoration,
        [key]: scrollTop,
      }));
    }, 100);

    node.addEventListener('scroll', handleScroll);
    return () => {
      node.removeEventListener('scroll', handleScroll);
    };
  }, [key, node, scrollRestoration, setScrollRestoration]);

  return ref;
}
