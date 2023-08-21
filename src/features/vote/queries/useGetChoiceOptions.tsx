import { useSuspenseQuery } from '@suspensive/react-query';
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
  return useSuspenseQuery({
    queryKey: ['choiceOptions', postId],
    queryFn: () => getChoiceOptions(postId),
    select: (data) => {
      const options = [];
      for (const option of data) {
        if (option.label) {
          options.push({
            id: option.id,
            label: option.label,
            image: option.url,
          });
        }
      }
      return options;
    },
  });
}
