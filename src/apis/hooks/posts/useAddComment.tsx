import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  AddCommentRequest,
  AddCommentResponse,
} from '@/apis/dto/posts/add-comment';
import { axiosInstance } from '@/libs/axios';

async function addComment(data: AddCommentRequest) {
  const res = await axiosInstance.post<AddCommentResponse>(
    '/worry-reply',
    data,
  );
  return res.data;
}

export default function useAddComment() {
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
