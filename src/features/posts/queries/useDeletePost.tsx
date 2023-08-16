import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/common/libs/axios';

import { DeletePostResponse } from './dto/delete-post';

async function deletePost(id: number) {
  const res = await axiosInstance.patch<DeletePostResponse>(
    `/worry/${id}/soft-delete`,
  );
  return res.data;
}

export function useDeletePost() {
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
