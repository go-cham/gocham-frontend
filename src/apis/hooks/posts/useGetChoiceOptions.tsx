import { useQuery } from '@tanstack/react-query';

import { GetChoiceOptionsResponse } from '@/apis/dto/posts/get-choice-options';
import { axiosInstance } from '@/libs/axios';

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

export default function useGetChoiceOptions(postId: number) {
  return useQuery({
    queryKey: ['choiceOptions', postId],
    queryFn: () => getChoiceOptions(postId),
  });
}
