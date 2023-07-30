import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ChooseOptionRequest,
  ChooseOptionResponse,
} from '@/apis/dto/posts/choose-option';
import { axiosInstance } from '@/libs/axios';

export default function useChooseOption() {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, isSuccess, error } = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: async ({ userId, worryChoiceId }: ChooseOptionRequest) => {
      const res = await axiosInstance.post<ChooseOptionResponse>(
        '/user-worry-choice',
        {
          userId,
          worryChoiceId,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      console.log('onSuccess');
      queryClient.refetchQueries(['myChoice']);
      queryClient.refetchQueries(['usersChoices']);
      queryClient.refetchQueries(['posts']);
    },
  });

  return {
    chooseOption: mutate,
    data,
    isLoading,
    error,
    isSuccess,
  };
}
