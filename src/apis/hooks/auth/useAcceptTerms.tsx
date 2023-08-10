import { useMutation } from '@tanstack/react-query';

import {
  AcceptTermsRequest,
  AcceptTermsResponse,
} from '@/apis/dto/auth/accept-terms';
import { axiosInstance } from '@/libs/axios';

export default function useAcceptTerms() {
  const { mutate, isSuccess, data, error, isLoading } = useMutation({
    mutationKey: ['acceptTerms'],
    mutationFn: async (data: AcceptTermsRequest) => {
      const res = await axiosInstance.patch<AcceptTermsResponse>(
        '/user/acceptance-of-terms',
        data,
      );
      return res.data;
    },
  });

  return {
    acceptTerms: mutate,
    data,
    error,
    isLoading,
    isSuccess,
  };
}
