import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EditPostRequest, EditPostResponse } from '@/apis/dto/posts/edit-post';
import { axiosInstance } from '@/libs/axios';

async function editPost(data: EditPostRequest) {
  const res = await axiosInstance.patch<EditPostResponse>(
    `/worries/${data.id}`,
    data,
  );
  return res.data;
}

export default function useEditPost() {
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
