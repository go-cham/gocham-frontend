import { useQuery } from '@tanstack/react-query';

import { GetPostResponse } from '@/apis/dto/posts/get-post';
import { axiosInstance } from '@/libs/axios';

export default function useGetPost(postId?: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const res = await axiosInstance.get<GetPostResponse>(
        `/worries/${postId}`
      );
      return res.data;
    },
  });

  return {
    post: data,
    isLoading,
    error,
  };
}
