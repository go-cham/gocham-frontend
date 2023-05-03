import { atom } from "jotai";

export type userDataAtomType = {
  name: string;
  userId: number | null;
  vender: string;
  userType: string;
};

export const userAtom = atom<userDataAtomType>({
  name: "미설정",
  userId: null,
  vender: "",
  userType: "",
});
