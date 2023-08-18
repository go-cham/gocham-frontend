import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/common/libs/axios';
import { User } from '@/features/user/types';
import { GetUserResponse } from './dto/get-user';

type ReturnData =
  | { user: User; isLoggedIn: true; isLoading: boolean }
  | { user: null; isLoggedIn: false; isLoading: boolean };

export function useUser(): ReturnData {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get<GetUserResponse>('/user');
        return res.data;
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 401) {
          return null;
        } else {
          throw e;
        }
      }
    },
  });

  if (!data) {
    return { user: null, isLoggedIn: false, isLoading };
  }

  const user: User = {
    id: data.id,
    joinStatus: data.joinStatus,
    email: data.email,
    type: data.role,
    vendor: data.vendor,
    nickname: data.nickname,
    birthDate: data.birthDate,
    gender: data.gender,
    residence: data.residence
      ? {
          value: data.residence.id,
          label: data.residence.label,
        }
      : null,
    job: data.job,
    worryCategories: data.userWorryCategories.map((category) => ({
      value: category.worryCategory.id,
      label: category.worryCategory.label,
    })),
    image: data.profileImageUrl,
  };

  return {
    user,
    isLoggedIn: true,
    isLoading,
  };
}
