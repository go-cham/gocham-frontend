import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DeletePostResponse } from '@/apis/dto/posts/delete-post';
import { axiosInstance } from '@/libs/axios';

async function deletePost(id: number) {
  const res = await axiosInstance.patch<DeletePostResponse>(
    `/worry/${id}/soft-delete`,
  );
  return res.data;
}

export default function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['posts'],
      });
    },
  });
}
