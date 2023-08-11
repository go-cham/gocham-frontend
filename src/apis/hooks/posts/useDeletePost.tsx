import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DeletePostResponse } from '@/apis/dto/posts/delete-post';
import { axiosInstance } from '@/libs/axios';

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, isSuccess, error } = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: async (id: number) => {
      const res = await axiosInstance.patch<DeletePostResponse>(
        `/worry/${id}/soft-delete`,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['posts'],
      });
    },
  });

  return {
    deletePost: mutate,
    data,
    isLoading,
    error,
    isSuccess,
  };
}
