import { OptionType } from '@/common/constants/options';

export interface User {
  id: number;
  email: string;
  type: string;
  vendor: string;
  nickname: string;
  birthDate: string;
  gender: Gender | null;
  residence: OptionType | null;
  job: string;
  worryCategories: OptionType[] | null;
  image: string | null;
  joinStatus: string;
}

export type UserInformation = {
  nickname: string;
  birthDay: string;
  gender: string;
  residence: OptionType;
  job: OptionType;
  worryCategories: OptionType[];
  profileImageUrl?: string;
};

export type Gender = 'male' | 'female';
