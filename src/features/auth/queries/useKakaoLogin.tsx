import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/common/libs/axios';

import { KakaoLoginResponse } from './dto/kakao-login';

async function kakaoLogin(code: string | null) {
  const res = await axiosInstance.get<KakaoLoginResponse>('/auth/kakao', {
    params: {
      code,
    },
  });
  return res.data;
}

export function useKakaoLogin(code: string | null) {
  return useQuery({
    queryKey: ['kakaoLogin', code],
    queryFn: () => kakaoLogin(code),
    select: (data) => data.token,
    enabled: !!code,
  });
}
