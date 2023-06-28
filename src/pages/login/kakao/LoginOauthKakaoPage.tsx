import { useAtom } from 'jotai';
import { useLocation, useNavigate } from 'react-router-dom';

import useKakaoLogin from '@/apis/hooks/auth/useKakaoLogin';
import { RouteURL } from '@/constants/route-url';
import { userType } from '@/constants/userTypeEnum';
import { userAtom } from '@/states/userData';
import { alertMessage } from '@/utils/alertMessage';
import getUserInfo from '@/utils/getUserInfo';

const LoginOauthKakaoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useAtom(userAtom);
  const code = new URLSearchParams(location.search).get('code') as string;
  const { token, error } = useKakaoLogin(code);

  if (userData.userId) {
    navigate(RouteURL.home);
  }

  if (error) {
    alert('로그인 과정에서 에러가 발생했습니다. 개발자에게 문의해주세요.');
    navigate('/login');
  }

  if (token) {
    window.localStorage.setItem('token', token);
    getUserInfo().then((userData) => setUserData(userData));

    if (userData?.userType === userType.onceUserWithoutTerms) {
      navigate(RouteURL.register_term);
    } else if (userData?.userType === userType.onceUser) {
      navigate(RouteURL.collect_information);
    } else if (userData?.userType === userType.deactivatedUser) {
      alert(alertMessage.error.user.deactivatedUser);
      navigate(RouteURL.login);
    } else if (userData?.userType === userType.dormantUser) {
      alert(alertMessage.error.user.dormantUser);
      navigate(RouteURL.login);
    } else {
      navigate(RouteURL.home);
    }
  }

  return null;
};

export default LoginOauthKakaoPage;
