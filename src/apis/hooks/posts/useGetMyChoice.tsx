import { useQuery } from '@tanstack/react-query';

import { GetMyChoiceResponse } from '@/apis/dto/posts/get-my-choice';
import { axiosInstance } from '@/libs/axios';

export default function useGetMyChoice({
  postId,
  userId,
}: {
  postId?: number;
  userId?: number;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myChoice', postId, userId],
    queryFn: async () => {
      const res = await axiosInstance.get<GetMyChoiceResponse>(
        '/user-worry-choice',
        {
          params: {
            worryId: postId,
            userId,
          },
        },
      );
      return res.data;
    },
  });

  return {
    choice: data?.worryChoice || null,
    isLoading,
    error,
  };
}
