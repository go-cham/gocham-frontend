import { useLocation, useNavigate } from 'react-router-dom';

import useKakaoLogin from '@/apis/hooks/auth/useKakaoLogin';
import useUser from '@/apis/hooks/users/useUser';
import { RouteURL } from '@/constants/route-url';
import { userType } from '@/constants/userTypeEnum';
import { alertMessage } from '@/utils/alertMessage';

const LoginOauthKakaoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const code = new URLSearchParams(location.search).get('code') as string;
  const { token, error } = useKakaoLogin(code);

  if (user?.id) {
    navigate(RouteURL.home);
  }

  if (error) {
    alert('로그인 과정에서 에러가 발생했습니다. 개발자에게 문의해주세요.');
    navigate('/login');
  }

  if (token) {
    window.localStorage.setItem('token', token);

    if (user?.type === userType.onceUserWithoutTerms) {
      navigate(RouteURL.register_term);
    } else if (user?.type === userType.onceUser) {
      navigate(RouteURL.collect_information);
    } else if (user?.type === userType.deactivatedUser) {
      alert(alertMessage.error.user.deactivatedUser);
      navigate(RouteURL.login);
    } else if (user?.type === userType.dormantUser) {
      alert(alertMessage.error.user.dormantUser);
      navigate(RouteURL.login);
    } else {
      navigate(RouteURL.home);
    }
  }

  return null;
};

export default LoginOauthKakaoPage;
