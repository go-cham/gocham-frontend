import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DeleteCommentResponse } from '@/apis/dto/posts/delete-comment';
import { axiosInstance } from '@/libs/axios';

async function deleteComment(id: number) {
  const res = await axiosInstance.patch<DeleteCommentResponse>(
    `/worry-reply/${id}/soft-delete`,
  );
  return res.data;
}

export default function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['comments'],
      });
      queryClient.refetchQueries({
        queryKey: ['posts'],
      });
    },
  });
}
