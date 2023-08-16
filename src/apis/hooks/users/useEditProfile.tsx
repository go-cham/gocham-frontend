import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  EditProfileRequest,
  EditProfileResponse,
} from '@/apis/dto/users/edit-profile';
import { axiosInstance } from '@/libs/axios';

async function editProfile(data: EditProfileRequest) {
  const res = await axiosInstance.patch<EditProfileResponse>('/user', data);
  return res.data;
}

export default function useEditProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['userType'],
      });
      queryClient.refetchQueries({
        queryKey: ['posts'],
      });
    },
  });
}
