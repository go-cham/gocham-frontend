import { ForwardedRef } from 'react';

export function assignMultipleRefs<U extends HTMLElement>(
  el: U | null,
  refs: (ForwardedRef<U | null> | React.MutableRefObject<U | null>)[],
) {
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  });
}
