import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/libs/axios';

export default function useUnregister() {
  const { isLoading, error, mutate, isSuccess } = useMutation({
    mutationKey: ['unregister'],
    mutationFn: async (data: { userId: number; reason: string }) => {
      const res = await axiosInstance.patch(
        `/user/${data.userId}/soft-delete`,
        {
          reason: data.reason,
        },
      );
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
