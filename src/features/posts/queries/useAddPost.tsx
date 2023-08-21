import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '@/common/libs/axios';
import { AddPostRequest, AddPostResponse } from './dto/add-post';

async function addPost(data: AddPostRequest) {
  const res = await axiosPrivate.post<AddPostResponse>('/worry', data);
  return res.data;
}

export function useAddPost() {
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
