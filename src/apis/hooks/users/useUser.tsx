import { useQuery } from '@tanstack/react-query';

import { GetUserResponse } from '@/apis/dto/users/get-user';
import { GetUserTypeResponse } from '@/apis/dto/users/get-user-type';
import { axiosInstance } from '@/libs/axios';
import { User } from '@/types/user';

export default function useUser(
  { enabled }: { enabled: boolean } = { enabled: true }
) {
  const { data, error: userTypeError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosInstance.get<GetUserTypeResponse>('/user/type');
      return res.data;
    },
    retry: false,
    enabled,
  });

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', data?.userId],
    queryFn: async () => {
      const res = await axiosInstance.get<GetUserResponse>(
        `/user/${data?.userId}`
      );
      return res.data;
    },
    retry: 5,
    enabled: !!data,
  });

  if (userTypeError) {
    return {
      user: null,
      isLoading: false,
      error: userTypeError,
      status: 'unauthenticated',
    };
  }

  const user: User | null =
    data && userData
      ? {
          id: userData.id,
          type: data.userType,
          vendor: data.vendor,
          nickname: userData.nickname,
          birthday: userData.birthDate,
          sex: userData.sex,
          residence: {
            value: userData.residence.id,
            label: userData.residence.label,
          },
          job: {
            value: userData.job.id,
            label: userData.job.label,
          },
          worryCategories: userData.userWorryCategories.map((category) => ({
            value: category.worryCategory.id,
            label: category.worryCategory.label,
          })),
          image: userData.profileImageUrl,
        }
      : null;

  return {
    user,
    isLoading,
    error,
    status: isLoading ? 'loading' : user ? 'authenticated' : 'unauthenticated',
  };
}
