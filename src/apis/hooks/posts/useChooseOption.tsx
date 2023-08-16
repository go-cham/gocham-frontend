import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ChooseOptionRequest,
  ChooseOptionResponse,
} from '@/apis/dto/posts/choose-option';
import { axiosInstance } from '@/libs/axios';

async function chooseOption(data: ChooseOptionRequest) {
  const res = await axiosInstance.post<ChooseOptionResponse>(
    '/user-worry-choice',
    {
      userId: data.userId,
      worryChoiceId: data.worryChoiceId,
    },
  );
  return res.data;
}

export default function useChooseOption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chooseOption,
    onSuccess: () => {
      queryClient.refetchQueries(['myChoice']);
      queryClient.refetchQueries(['usersChoices']);
      queryClient.refetchQueries(['posts']);
      queryClient.refetchQueries(['comments']);
    },
  });
}
