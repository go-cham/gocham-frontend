import { useQuery } from '@tanstack/react-query';

import { GetUsersChoices } from '@/apis/dto/posts/get-users-choices';
import { axiosInstance } from '@/libs/axios';

async function getUserChoices(postId?: number) {
  const res = await axiosInstance.get<GetUsersChoices>('/user-worry-choice', {
    params: {
      worryId: postId,
    },
  });
  return res.data;
}

export default function useGetUsersChoices(postId?: number) {
  return useQuery({
    queryKey: ['usersChoices', postId],
    queryFn: () => getUserChoices(postId),
  });
}
