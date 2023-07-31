import { atom } from 'jotai';

import { Gender } from '@/types/user';

interface RegisterData {
  nickname: string;
  birthday: string;
  gender: Gender | null;
  residenceId: number | null;
  job: string;
  categoryIds: number[];
  accept: {
    gochamTerm: boolean;
    personalInformation: boolean;
    olderThan14: boolean;
    marketing: boolean;
    allCheck: boolean;
  };
}

export const registerDataAtom = atom<RegisterData>({
  nickname: '',
  birthday: '',
  gender: null,
  residenceId: null,
  job: '',
  categoryIds: [],
  accept: {
    gochamTerm: false,
    personalInformation: false,
    olderThan14: false,
    marketing: false,
    allCheck: false,
  },
});
