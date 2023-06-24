import { Dispatch } from 'react';

import { OptionType } from '@/constants/Options';

export type userInformationType = {
  nickname: string;
  birthDay: string;
  sex: string;
  residence: OptionType;
  job: OptionType;
  worryCategories: OptionType[];
  profileImageUrl?: string;
};

export type userInformationPropsType = {
  userInformation: userInformationType;
  setUserInformation: Dispatch<any>;
};

export type postUserInformationPropsType = {
  userId: number;
  nickname: string; // 제거 예정
  birthDate: string;
  sex: string;
  residenceId: number | string; // 추후 number로 변경됨.
  jobId: number | string; // 추후 number로 변경됨.
  worryCategories: number[];
};
