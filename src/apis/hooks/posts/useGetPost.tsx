import { useQuery } from '@tanstack/react-query';
import { isNumber } from 'lodash';

import { GetPostResponse } from '@/apis/dto/posts/get-post';
import { axiosInstance } from '@/libs/axios';

async function getPost(postId?: number) {
  const res = await axiosInstance.get<GetPostResponse>(`/worries/${postId}`);
  return res.data;
}

export default function useGetPost(postId?: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
    select: (data) => ({
      ...data,
      worryFiles: data.worryFiles.filter((file) => file.status === 'activated'),
    }),
    enabled: isNumber(postId),
  });
}
