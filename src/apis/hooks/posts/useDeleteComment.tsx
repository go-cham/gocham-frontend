import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DeleteCommentResponse } from '@/apis/dto/posts/delete-comment';
import { axiosInstance } from '@/libs/axios';

export default function useDeleteComment() {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, isSuccess, error } = useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: async (id: number) => {
      const res = await axiosInstance.patch<DeleteCommentResponse>(
        `/worry-reply/${id}/soft-delete`,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['comments'],
      });
      queryClient.refetchQueries({
        queryKey: ['posts'],
      });
    },
  });

  return {
    deleteComment: mutate,
    data,
    isLoading,
    error,
    isSuccess,
  };
}
