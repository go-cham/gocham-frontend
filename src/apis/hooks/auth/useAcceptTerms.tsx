import { useMutation } from '@tanstack/react-query';

import {
  AcceptTermsRequest,
  AcceptTermsResponse,
} from '@/apis/dto/auth/accept-terms';
import { axiosInstance } from '@/libs/axios';

async function acceptTerms(data: AcceptTermsRequest) {
  const res = await axiosInstance.patch<AcceptTermsResponse>(
    '/user/acceptance-of-terms',
    data,
  );
  return res.data;
}

export default function useAcceptTerms() {
  return useMutation({
    mutationFn: acceptTerms,
  });
}
