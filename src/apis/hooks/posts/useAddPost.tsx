import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AddPostRequest, AddPostResponse } from '@/apis/dto/posts/add-post';
import { axiosInstance } from '@/libs/axios';

async function addPost(data: AddPostRequest) {
  const res = await axiosInstance.post<AddPostResponse>('/worry', data);
  return res.data;
}

export default function useAddPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['posts'],
      });
    },
  });
}
