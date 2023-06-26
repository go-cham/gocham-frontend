import { useQuery } from '@tanstack/react-query';

import { GetCommentsResponse } from '@/apis/dto/posts/get-comments';
import { axiosInstance } from '@/libs/axios';

export default function useGetComments(postId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await axiosInstance.get<GetCommentsResponse>(
        '/worry-replies',
        {
          params: {
            worryId: postId,
          },
        }
      );
      return res.data;
    },
  });

  return {
    comments: data,
    isLoading,
    error,
  };
}
