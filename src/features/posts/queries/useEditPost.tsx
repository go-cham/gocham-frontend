import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/common/libs/axios';

import { EditPostRequest, EditPostResponse } from './dto/edit-post';

async function editPost(data: EditPostRequest) {
  const res = await axiosInstance.patch<EditPostResponse>(
    `/worries/${data.id}`,
    data,
  );
  return res.data;
}

export function useEditPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPost,
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ['post', data.id],
      });
    },
  });
}
