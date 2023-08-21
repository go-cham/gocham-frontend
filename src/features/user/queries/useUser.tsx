import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { axiosInstance } from '@/common/libs/axios';
import { User } from '@/features/user/types';
import { userLocalStorage } from '@/features/user/utils/user-local-storage';
import { GetUserResponse } from './dto/get-user';

async function getUser() {
  const res = await axiosInstance.get<GetUserResponse>('/user');
  return res.data;
}

export function useUser() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: userLocalStorage.getUser(),
  });

  const user: User | null = useMemo(
    () =>
      data
        ? {
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
            worryCategories: data.userWorryCategories?.map((category) => ({
              value: category.worryCategory.id,
              label: category.worryCategory.label,
            })),
            image: data.profileImageUrl,
          }
        : null,
    [data],
  );

  useEffect(() => {
    if (!user) {
      userLocalStorage.removeUser();
    } else {
      userLocalStorage.saveUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      userLocalStorage.removeUser();
    }
  }, [isError]);

  return {
    user,
    isLoggedIn: !!user,
    isLoading,
  };
}
