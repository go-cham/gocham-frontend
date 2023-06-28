import { useQuery } from '@tanstack/react-query';

import { GetVotingOptions } from '@/apis/dto/posts/get-voting-options';
import { axiosInstance } from '@/libs/axios';

export default function useGetVotingOptions(postId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['votingOptions', postId],
    queryFn: async () => {
      const res = await axiosInstance.get<GetVotingOptions>('/worry-choices', {
        params: {
          worryId: postId,
        },
      });
      return res.data;
    },
  });

  return {
    votingOptions: data,
    isLoading,
    error,
  };
}
