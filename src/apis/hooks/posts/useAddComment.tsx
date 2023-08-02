import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  AddCommentsRequest,
  AddCommentsResponse,
} from '@/apis/dto/posts/add-comments';
import { axiosInstance } from '@/libs/axios';

export default function useAddComment() {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, error, isSuccess } = useMutation({
    mutationKey: ['comment'],
    mutationFn: async (data: AddCommentsRequest) => {
      const res = await axiosInstance.post<AddCommentsResponse>(
        '/worry-reply',
        data
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
    addComment: mutate,
    isLoading,
    isSuccess,
    error,
    data,
  };
}
