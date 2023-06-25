// 리다이렉트될 화면
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import { userType } from '@/constants/userTypeEnum';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import { userAtom } from '@/states/userData';
import { alertMessage } from '@/utils/alertMessage';
import getUserInfo from '@/utils/getUserInfo';

const LoginOauthKakaoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useAtom(userAtom);

  useEffect(() => {
    // const code = new URL(window.location.href).searchParams.get("code");
    const code = new URLSearchParams(location.search).get('code') as string;

    // console.log(`code: ${code}`);
    (async () => {
      if (userData.userId === null) {
        try {
          if (code) {
            const res = await ApiConfig.request({
              method: HttpMethod.GET,
              url: EndPoint.login.get.KAKAO_AUTH,
              query: { code },
            });
            const data = res && res.data;
            window.localStorage.setItem('token', data.token);
            const userData = await getUserInfo();
            setUserData(userData);

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
              // console.log("로그인 성공~");
              navigate(RouteURL.home);
            }
          }
        } catch (e) {
          console.error(e);
          alert(
            '로그인 과정에서 에러가 발생했습니다. 개발자에게 문의해주세요.'
          );
          navigate('/login');
        }
      } else {
        navigate(RouteURL.home);
      }
    })();
  }, []);

  return null;
};

export default LoginOauthKakaoPage;
