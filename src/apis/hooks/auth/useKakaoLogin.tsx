import { useQuery } from '@tanstack/react-query';

import { KakaoLoginResponse } from '@/apis/dto/auth/kakao-login';
import { axiosInstance } from '@/libs/axios';

async function kakaoLogin(code: string | null) {
  const res = await axiosInstance.get<KakaoLoginResponse>('/auth/kakao', {
    params: {
      code,
    },
  });
  return res.data;
}

export default function useKakaoLogin(code: string | null) {
  return useQuery({
    queryKey: ['kakaoLogin', code],
    queryFn: () => kakaoLogin(code),
    select: (data) => data.token,
    enabled: !!code,
  });
}
