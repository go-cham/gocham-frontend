import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import useKakaoLogin from '@/features/auth/queries/useKakaoLogin';
import useUser from '@/features/user/queries/useUser';

export default function LoginOauthKakaoPage() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { data: token, error } = useKakaoLogin(code);
  const { user } = useUser();

  useEffect(() => {
    document.body.style.height = `${window.innerHeight}px`;
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    }
  }, [queryClient, token]);

  if (error) {
    alert('로그인 과정에서 에러가 발생했습니다. 개발자에게 문의해주세요.');
    return <Navigate to={'/'} />;
  }

  if (user?.job) {
    return <Navigate to={'/'} />;
  }

  if (user && !user.job) {
    return <Navigate to={'/register/term'} />;
  }

  return null;
}
