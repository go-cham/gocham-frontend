import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  AddCommentsRequest,
  AddCommentsResponse,
} from '@/apis/dto/posts/add-comments';
import { axiosInstance } from '@/libs/axios';

export default function useAddComment() {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, error } = useMutation({
    mutationKey: ['comment'],
    mutationFn: async (data: AddCommentsRequest) => {
      const res = await axiosInstance.post<AddCommentsResponse>(
        '/worry-reply',
        data
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments'],
      });
    },
  });

  return {
    addComment: mutate,
    isLoading,
    error,
    data,
  };
}
