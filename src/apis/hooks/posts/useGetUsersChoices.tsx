import { useQuery } from '@tanstack/react-query';

import { GetUsersChoices } from '@/apis/dto/posts/get-users-choices';
import { axiosInstance } from '@/libs/axios';

export default function useGetUsersChoices(postId?: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['usersChoices', postId],
    queryFn: async () => {
      const res = await axiosInstance.get<GetUsersChoices>(
        '/user-worry-choice',
        {
          params: {
            worryId: postId,
          },
        }
      );
      return res.data;
    },
  });

  return {
    usersChoices: data,
    isLoading,
    error,
  };
}
