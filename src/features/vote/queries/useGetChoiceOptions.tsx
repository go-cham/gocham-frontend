import { useSuspenseQuery } from '@suspensive/react-query';
import { axiosPrivate } from '@/common/libs/axios';
import { GetChoiceOptionsResponse } from './dto/get-choice-options';

async function getChoiceOptions(postId: number) {
  const res = await axiosPrivate.get<GetChoiceOptionsResponse>(
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
