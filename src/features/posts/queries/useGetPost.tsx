import { useQuery } from '@tanstack/react-query';
import { isNumber } from 'lodash';

import { axiosInstance } from '@/common/libs/axios';

import { GetPostResponse } from './dto/get-post';

async function getPost(postId?: number) {
  const res = await axiosInstance.get<GetPostResponse>(`/worries/${postId}`);
  return res.data;
}

export function useGetPost(postId?: number) {
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
