import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/common/libs/axios';
import { User } from '@/features/user/types';
import { GetUserResponse } from './dto/get-user';
import { GetUserTypeResponse } from './dto/get-user-type';

type ReturnData =
  | { user: User; isLoggedIn: true; isLoading: boolean }
  | { user: null; isLoggedIn: false; isLoading: boolean };

export function useUser(): ReturnData {
  let userType = '';
  const { data, isLoading } = useQuery({
    queryKey: ['userType'],
    queryFn: async () => {
      try {
        const userTypeRes = await axiosInstance.get<GetUserTypeResponse>(
          '/user/type',
        );
        userType = userTypeRes.data.userType;
        const userId = userTypeRes.data.userId;
        const userRes = await axiosInstance.get<GetUserResponse>(
          `/user/${userId}`,
        );
        return userRes.data;
      } catch (e) {
        return null;
      }
    },
    retry: false,
  });

  if (!data) {
    return { user: null, isLoggedIn: false, isLoading };
  }

  const user: User = {
    id: data.id,
    joinStatus: data.joinStatus,
    email: data.email,
    type: userType,
    vendor: data.vendor,
    nickname: data.nickname,
    birthDate: data.birthDate,
    sex: data.sex,
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
