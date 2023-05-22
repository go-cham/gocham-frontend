import { atom } from "jotai";

const initialUserData = {
  worryId: 0,
  worryChoiceId: 0,
  confirm: false,
};

export const justResultWorryHandlerAtom = atom<{
  worryId: number;
  worryChoiceId: number;
  confirm: boolean;
}>(initialUserData);
