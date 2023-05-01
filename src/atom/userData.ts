import { atom } from "jotai";

export type userDataAtomType = {
  name: string;
};
export const userAtom = atom<userDataAtomType>({
  name: "미설정",
});
