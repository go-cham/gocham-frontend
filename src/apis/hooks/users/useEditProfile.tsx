import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  EditProfileRequest,
  EditProfileResponse,
} from '@/apis/dto/users/edit-profile';
import { axiosInstance } from '@/libs/axios';

export default function useEditProfile() {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, isSuccess, error } = useMutation({
    mutationKey: ['editProfile'],
    mutationFn: async (data: EditProfileRequest) => {
      const res = await axiosInstance.patch<EditProfileResponse>('/user', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['userType'],
      });
      queryClient.refetchQueries({
        queryKey: ['posts'],
      });
    },
  });

  return {
    editProfile: mutate,
    data,
    isLoading,
    error,
    isSuccess,
  };
}
