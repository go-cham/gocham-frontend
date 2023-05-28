import { atom } from "jotai";

export type userDataAtomType = {
  name: string;
  userId: number | null;
  vender: string;
  userType: string;
};

export const initialUserData = {
  name: "미설정",
  userId: null, // null이면 아직 로그인 로직 미작동, 0이면 로그인 로직 작동 됨.
  vender: "",
  userType: "",
};

export const userAtom = atom<userDataAtomType>(initialUserData);
