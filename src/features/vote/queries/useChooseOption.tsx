import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '@/common/libs/axios';
import { ChooseOptionRequest, ChooseOptionResponse } from './dto/choose-option';

async function chooseOption(data: ChooseOptionRequest) {
  const res = await axiosPrivate.post<ChooseOptionResponse>(
    '/user-worry-choice',
    {
      userId: data.userId,
      worryChoiceId: data.worryChoiceId,
    },
  );
  return res.data;
}

export function useChooseOption({
  postId,
  userId,
}: {
  postId: number;
  userId?: number;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chooseOption,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(['myChoice', { postId, userId }]),
        queryClient.invalidateQueries(['usersChoices', { postId }]),
        queryClient.invalidateQueries(['posts']),
        queryClient.invalidateQueries(['comments', { postId }]),
      ]);
    },
  });
}
