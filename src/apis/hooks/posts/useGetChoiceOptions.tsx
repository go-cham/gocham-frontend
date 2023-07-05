import { useQuery } from '@tanstack/react-query';

import { GetChoiceOptionsResponse } from '@/apis/dto/posts/get-choice-options';
import { axiosInstance } from '@/libs/axios';

export default function useGetChoiceOptions(postId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['choiceOptions', postId],
    queryFn: async () => {
      const res = await axiosInstance.get<GetChoiceOptionsResponse>(
        '/worry-choices',
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
    choiceOptions: data,
    isLoading,
    error,
  };
}
