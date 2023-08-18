import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/common/libs/axios';
import { ChooseOptionRequest, ChooseOptionResponse } from './dto/choose-option';

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

export function useChooseOption() {
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
