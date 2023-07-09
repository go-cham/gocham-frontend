import { useMutation } from '@tanstack/react-query';

import {
  ChooseOptionRequest,
  ChooseOptionResponse,
} from '@/apis/dto/posts/choose-option';
import { axiosInstance } from '@/libs/axios';

export default function useChooseOption() {
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
  });

  return {
    chooseOption: mutate,
    data,
    isLoading,
    error,
    isSuccess,
  };
}
