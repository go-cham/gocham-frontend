import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AddPostRequest, AddPostResponse } from '@/apis/dto/posts/add-post';
import { axiosInstance } from '@/libs/axios';

export default function useAddPost() {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, error } = useMutation({
    mutationKey: ['post'],
    mutationFn: async (data: AddPostRequest) => {
      const res = await axiosInstance.post<AddPostResponse>('/worry', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });

  return {
    addPost: mutate,
    data,
    isLoading,
    error,
  };
}
