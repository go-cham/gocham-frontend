import { atom } from "jotai";

const initialUserData = {
  worryId: 0,
};

export const chatInputFocusAtom = atom<{
  worryId: number | null;
}>(initialUserData);
