import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/common/libs/axios';

import { AddCommentRequest, AddCommentResponse } from './dto/add-comment';

async function addComment(data: AddCommentRequest) {
  const res = await axiosInstance.post<AddCommentResponse>(
    '/worry-reply',
    data,
  );
  return res.data;
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
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
