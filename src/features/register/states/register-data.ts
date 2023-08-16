import { atom } from 'jotai';
import { Gender } from '@/common/types/user';

interface RegisterData {
  nickname: string;
  birthDate: string;
  gender: Gender | null;
  residenceId: number | null;
  job: string;
  categoryIds: number[];
  accept: {
    gochamTerm: boolean;
    personalInformation: boolean;
    allCheck: boolean;
  };
}

export const registerDataAtom = atom<RegisterData>({
  nickname: '',
  birthDate: '',
  gender: null,
  residenceId: null,
  job: '',
  categoryIds: [],
  accept: {
    gochamTerm: false,
    personalInformation: false,
    allCheck: false,
  },
});
