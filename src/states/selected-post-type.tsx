import { atomWithStorage } from 'jotai/utils';

import { PostType } from '@/pages/user/UserPage';

export const selectedPostTypeAtom = atomWithStorage<PostType>(
  'selectedPostType',
  'my',
  {
    getItem: (key, initialValue) =>
      (sessionStorage.getItem(key) as PostType | null) ?? initialValue,
    setItem: (key, value) => sessionStorage.setItem(key, value),
    removeItem: (key) => sessionStorage.removeItem(key),
  },
);
