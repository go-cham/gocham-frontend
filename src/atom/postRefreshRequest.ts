import { atom } from 'jotai';

const initialUserData = {
  worryIdx: 0,
  updateObject: '',
};

export const refreshChatAtom = atom<{
  worryIdx: number | null;
  updateObject: string;
}>(initialUserData);
