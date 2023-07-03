import { Dispatch } from 'react';

import { OptionType } from '@/constants/Options';

export interface User {
  id: number;
  type: string;
  vendor: string;
  nickname: string;
  birthday: string | null;
  sex: Gender | null;
  residence: OptionType | null;
  job: OptionType | null;
  worryCategories: OptionType[] | null;
  image: string | null;
}

export type userInformationType = {
  nickname: string;
  birthDay: string;
  sex: string;
  residence: OptionType;
  job: OptionType;
  worryCategories: OptionType[];
  profileImageUrl?: string;
};

export type UserInformationPropsType = {
  userInformation: userInformationType;
  setUserInformation: Dispatch<any>;
};

export type PostUserInformationPropsType = {
  userId: number;
  nickname: string; // 제거 예정
  birthDate: string;
  sex: string;
  residenceId: number;
  jobId: number;
  worryCategories: number[];
};

export type Gender = 'male' | 'female';
