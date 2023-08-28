import { useQuery } from '@tanstack/react-query';
import { axiosPrivate } from '@/common/libs/axios';
import { GetPostResponse } from './dto/get-post';

async function getPost(postId?: number) {
  const res = await axiosPrivate.get<GetPostResponse>(`/worries/${postId}`);
  return res.data;
}

export default function useGetPost(postId: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
    select: (data) => ({
      ...data,
      worryFiles: data.worryFiles.filter((file) => file.status === 'activated'),
    }),
  });
}
