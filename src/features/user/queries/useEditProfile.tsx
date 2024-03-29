import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '@/common/libs/axios';
import { EditProfileRequest, EditProfileResponse } from './dto/edit-profile';

async function editProfile(data: EditProfileRequest) {
  const res = await axiosPrivate.patch<EditProfileResponse>('/user', data);
  return res.data;
}

export default function useEditProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['user'],
      });
      queryClient.refetchQueries({
        queryKey: ['posts'],
      });
    },
  });
}
