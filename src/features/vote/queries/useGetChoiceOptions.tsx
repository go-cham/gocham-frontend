import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/common/libs/axios';
import { GetChoiceOptionsResponse } from './dto/get-choice-options';

async function getChoiceOptions(postId: number) {
  const res = await axiosInstance.get<GetChoiceOptionsResponse>(
    '/worry-choices',
    {
      params: {
        worryId: postId,
      },
    },
  );
  return res.data;
}

export function useGetChoiceOptions(postId: number) {
  return useQuery({
    queryKey: ['choiceOptions', postId],
    queryFn: () => getChoiceOptions(postId),
  });
}
