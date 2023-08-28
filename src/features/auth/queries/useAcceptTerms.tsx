import { useMutation } from '@tanstack/react-query';
import { axiosPrivate } from '@/common/libs/axios';
import { AcceptTermsRequest, AcceptTermsResponse } from './dto/accept-terms';

async function acceptTerms(data: AcceptTermsRequest) {
  const res = await axiosPrivate.patch<AcceptTermsResponse>(
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
