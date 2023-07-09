import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/libs/axios';

export default function useUnregister() {
  const { isLoading, error, mutate, isSuccess } = useMutation({
    mutationKey: ['unregister'],
    mutationFn: async (userId: number) => {
      const res = await axiosInstance.patch(`/user/${userId}/soft-delete`);
      return res.data;
    },
  });

  return {
    unregister: mutate,
    isLoading,
    error,
    isSuccess,
  };
}
