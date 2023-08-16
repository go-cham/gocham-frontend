import { useQuery } from '@tanstack/react-query';
import { isNumber } from 'lodash';

import { axiosInstance } from '@/common/libs/axios';

import { GetMyChoiceResponse } from './dto/get-my-choice';

async function getMyChoice(postId?: number, userId?: number) {
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
}

export function useGetMyChoice({
  postId,
  userId,
}: {
  postId?: number;
  userId?: number;
}) {
  return useQuery({
    queryKey: ['myChoice', postId, userId],
    queryFn: () => getMyChoice(postId, userId),
    select: (data) => data.worryChoice,
    enabled: isNumber(postId) && isNumber(userId),
  });
}
