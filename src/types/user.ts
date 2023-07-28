import { OptionType } from '@/constants/options';

export interface User {
  id: number;
  type: string;
  vendor: string;
  nickname: string;
  birthday: string | null;
  sex: Gender | null;
  residence: OptionType | null;
  job: string;
  worryCategories: OptionType[] | null;
  image: string | null;
}

export type UserInformation = {
  nickname: string;
  birthDay: string;
  sex: string;
  residence: OptionType;
  job: OptionType;
  worryCategories: OptionType[];
  profileImageUrl?: string;
};

export type Gender = 'male' | 'female';
