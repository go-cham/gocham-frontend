import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import { userAtom } from '@/atom/userData';
import { userType } from '@/constants/userTypeEnum';
import getUserInfo from '@/utils/getUserInfo';

type AuthProps = {
  SpecificComponent: React.ComponentType<any>;
  requiredLogin: boolean | null;
};
/**
 *
 * @param SpecificComponent HOC가 필요한 컴포넌트
 * @param requiredLogin null=로그인 상관X, true=개인정보 입력까지 마친 상태만 접근 가능, false=개인정보입력까지 마친 상태면 접근 불가
 * @constructor
 */
const Auth = ({ SpecificComponent, requiredLogin = null }: AuthProps) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useAtom(userAtom);
  useEffect(() => {
    let newUserInfo = userInfo;

    const checkIsLogin = async () => {
      if (!userInfo.userId) {
        newUserInfo = await getUserInfo();
        setUserInfo(newUserInfo);
      }

      if (newUserInfo.userType === userType.onceUser)
        navigate(RouteURL.collect_information);
      else if (newUserInfo.userType === userType.onceUserWithoutTerms)
        navigate(RouteURL.register_term);
      else if (requiredLogin === false) {
        if (newUserInfo.userType === userType.activatedUser)
          navigate(RouteURL.home);
        else if (newUserInfo.userType === userType.onceUser)
          navigate(RouteURL.collect_information);
        else if (newUserInfo.userType === userType.onceUserWithoutTerms)
          navigate(RouteURL.register_term);
        else navigate(RouteURL.login);
      } else if (requiredLogin === true) {
        if (newUserInfo.userType !== userType.activatedUser) {
          navigate(RouteURL.login);
        }
      }
    };

    checkIsLogin();
  }, []);

  return <SpecificComponent />;
};

export default Auth;
