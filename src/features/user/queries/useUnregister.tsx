import { useMutation } from '@tanstack/react-query';
import { axiosPrivate } from '@/common/libs/axios';

async function unregister(data: { userId: number; reason: string }) {
  const res = await axiosPrivate.patch(`/user/${data.userId}/soft-delete`, {
    reason: data.reason,
  });
  return res.data;
}

export function useUnregister() {
  return useMutation({
    mutationFn: unregister,
  });
}
