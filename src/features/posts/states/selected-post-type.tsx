import { atomWithStorage } from 'jotai/utils';
import { POST_TYPE } from '@/common/constants/post-type';

export const selectedPostTypeAtom = atomWithStorage<POST_TYPE>(
  'selectedPostType',
  (sessionStorage.getItem('selectedPostType') as POST_TYPE) || POST_TYPE.MY,
  {
    getItem: (key, initialValue) =>
      (sessionStorage.getItem(key) as POST_TYPE | null) ?? initialValue,
    setItem: (key, value) => sessionStorage.setItem(key, value),
    removeItem: (key) => sessionStorage.removeItem(key),
  },
);
