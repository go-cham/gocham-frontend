import { useQuery } from '@tanstack/react-query';

import { GetUserResponse } from '@/apis/dto/users/get-user';
import { GetUserTypeResponse } from '@/apis/dto/users/get-user-type';
import { axiosInstance } from '@/libs/axios';
import { User } from '@/types/user';

type ReturnData =
  | { user: User; isLoggedIn: true }
  | { user: null; isLoggedIn: false };

export default function useUser(): ReturnData {
  let userType = '';
  const { data } = useQuery({
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
    return { user: null, isLoggedIn: false };
  }

  const user: User = {
    id: data.id,
    joinStatus: data.joinStatus,
    email: data.email,
    type: userType,
    vendor: data.vendor,
    nickname: data.nickname,
    birthday: data.birthDate,
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
  };
}
