import { Residence } from '@/common/dto/residence';
import { WorryCategory } from '@/common/dto/worry-category';
import { Gender } from '@/features/user/types';

export interface GetUserResponse {
  email: string;
  phoneNumber: string | null;
  profileImageUrl: string | null;
  id: number;
  status: string;
  updatedAt: string;
  nickname: string;
  birthDate: string;
  gender: Gender;
  marketingAcceptedAt: string | null;
  joinStatus: string;
  vendor: string;
  userWorryCategories: WorryCategory[];
  residence: Residence;
  job: string;
  role: string;
}
