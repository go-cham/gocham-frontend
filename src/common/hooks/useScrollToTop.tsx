import { useRef } from 'react';

export default function useScrollToTop<U extends HTMLElement>() {
  const ref = useRef<U | null>(null);
  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return {
    ref,
    scrollToTop,
  };
}
