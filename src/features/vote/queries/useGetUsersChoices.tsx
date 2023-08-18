import { useQuery } from '@tanstack/react-query';
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
  return useQuery({
    queryKey: ['usersChoices', postId],
    queryFn: () => getUserChoices(postId),
  });
}
