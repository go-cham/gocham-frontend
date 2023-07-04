import { navigate } from '@storybook/addon-links';
import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import useKakaoLogin from '@/apis/hooks/auth/useKakaoLogin';
import useUser from '@/apis/hooks/users/useUser';
import { RouteURL } from '@/constants/route-url';
import { userType } from '@/constants/userTypeEnum';

export default function LoginOauthKakaoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { token, error } = useKakaoLogin(code);
  const { user } = useUser({ enabled: !!token });

  if (error) {
    alert('로그인 과정에서 에러가 발생했습니다. 개발자에게 문의해주세요.');
    return <Navigate to={RouteURL.home} />;
  }

  if (token) {
    localStorage.setItem('token', token);
  }

  useEffect(() => {
    document.querySelector('body')!.style.height = `${window.innerHeight}px`;
  }, []);

  useEffect(() => {
    if (user) {
      switch (user.type) {
        case userType.onceUser:
        case userType.onceUserWithoutTerms:
          return navigate(RouteURL.register_term);
        case userType.deactivatedUser:
        case userType.dormantUser:
          return navigate(RouteURL.login);
        default:
          navigate(RouteURL.home);
      }
    }
  }, [user]);

  return null;
}
