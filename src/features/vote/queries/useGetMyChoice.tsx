import { useQuery } from '@tanstack/react-query';
import { axiosPrivate } from '@/common/libs/axios';
import { GetMyChoiceResponse } from './dto/get-my-choice';

async function getMyChoice(postId?: number, userId?: number) {
  const res = await axiosPrivate.get<GetMyChoiceResponse>(
    '/user-worry-choice',
    {
      params: {
        worryId: postId,
        userId,
      },
    },
  );
  return res.data;
}

export default function useGetMyChoice({
  postId,
  userId,
}: {
  postId?: number;
  userId?: number;
}) {
  return useQuery({
    queryKey: ['myChoice', { postId, userId }],
    queryFn: () => getMyChoice(postId, userId),
    select: (data) => {
      if (!data) {
        return null;
      }

      return {
        ...data.worryChoice,
        isAbstained: data.worryChoice.isAbstained === 'yes',
      };
    },
  });
}
