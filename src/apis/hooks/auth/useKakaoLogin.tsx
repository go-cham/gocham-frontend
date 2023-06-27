import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { KakaoLoginResponse } from '@/apis/dto/auth/kakao-login';

export default function useKakaoLogin(code: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['kakaoLogin', code],
    queryFn: async () => {
      const res = await axios.get<KakaoLoginResponse>('/auth/kakao', {
        params: {
          code,
        },
      });
      return res.data;
    },
    enabled: !!code,
  });

  return {
    token: data?.token || null,
    isLoading,
    error,
  };
}
