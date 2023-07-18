import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AddPostRequest, AddPostResponse } from '@/apis/dto/posts/add-post';
import { axiosInstance } from '@/libs/axios';

export default function useAddPost() {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, error, isSuccess } = useMutation({
    mutationKey: ['post'],
    mutationFn: async (data: AddPostRequest) => {
      const res = await axiosInstance.post<AddPostResponse>('/worry', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['posts'],
      });
    },
    retry: 2,
    retryDelay: 1000,
  });

  return {
    addPost: mutate,
    data,
    isLoading,
    error,
    isSuccess,
  };
}
