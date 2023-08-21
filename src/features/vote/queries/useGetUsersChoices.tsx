import { useSuspenseQuery } from '@suspensive/react-query';
import { axiosInstance } from '@/common/libs/axios';
import { GetUsersChoices } from './dto/get-users-choices';

async function getUserChoices(postId?: number) {
  const res = await axiosInstance.get<GetUsersChoices>('/user-worry-choice', {
    params: {
      worryId: postId,
    },
  });
  return res.data;
}

export function useGetUsersChoices(postId?: number) {
  return useSuspenseQuery({
    queryKey: ['usersChoices', { postId }],
    queryFn: () => getUserChoices(postId),
    select: (data) =>
      data.map((choice) => ({
        ...choice,
        isAbstained: choice.isAbstained === 'yes',
      })),
  });
}
