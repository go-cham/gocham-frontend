import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '@/common/libs/axios';
import { DeleteCommentResponse } from './dto/delete-comment';

async function deleteComment(id: number) {
  const res = await axiosPrivate.patch<DeleteCommentResponse>(
    `/worry-reply/${id}/soft-delete`,
  );
  return res.data;
}

export function useDeleteComment() {
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
