import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { KakaoLoginResponse } from './dto/kakao-login';

async function kakaoLogin(code: string | null) {
  const res = await axios.get<KakaoLoginResponse>(
    `${import.meta.env.VITE_SERVER_API}/auth/kakao`,
    {
      params: {
        code,
      },
    },
  );
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
