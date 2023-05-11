// 리다이렉트될 화면

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import getUserInfo from "../../utils/getUserInfo";
import { RouteURL } from "../../App";
import { alertMessage } from "../../utils/alertMessage";
import { useAtom } from "jotai";
import { userAtom } from "../../atom/userData";
import BackButton from "../../images/Common/back_button.png";
import styled from "@emotion/styled";

const LoginOauthKakao = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useAtom(userAtom);

  useEffect(() => {
    // const code = new URL(window.location.href).searchParams.get("code");
    const code = new URLSearchParams(location.search).get("code") as string;

    console.log(`code: ${code}`);
    (async () => {
      if (userData.userId === null) {
        try {
          if (code) {
            const res = await ApiConfig.request({
              method: HttpMethod.GET,
              url: EndPoint.login.get.KAKAO_AUTH,
              query: { code },
            });
            console.log("res");
            console.log(res);
            const data = res && res.data;
            window.localStorage.setItem("token", data.token);
            const userData = await getUserInfo();
            setUserData(userData);

            if (userData?.userType === "onceUserWithoutTerms") {
              navigate(RouteURL.register_term);
            } else if (userData?.userType === "onceUser") {
              navigate(RouteURL.collect_information);
            } else if (userData?.userType === "deactivatedUser") {
              alert(alertMessage.error.user.deactivatedUser);
              navigate(RouteURL.login);
            } else if (userData?.userType === "dormantUser") {
              alert(alertMessage.error.user.dormantUser);
              navigate(RouteURL.login);
            } else {
              console.log("로그인 성공~");
              navigate(RouteURL.home);
            }
          }
        } catch (e) {
          console.error(e);
          alert(
            "로그인 과정에서 에러가 발생했습니다. 개발자에게 문의해주세요."
          );
          navigate("/login");
        }
      } else {
        navigate(RouteURL.home);
      }
    })();
  }, []);
  return (
    <>
      <RegisterTermWrap></RegisterTermWrap>
    </>
  );
};

export default LoginOauthKakao;

const RegisterTermWrap = styled.div`
  width: 80vw;
  margin-top: 2.4rem;
  & > .약관문구 {
    margin-top: 3.9rem;
    margin-bottom: 3rem;
    font-weight: 700;
    font-size: 2.7rem;
    line-height: 3.9rem;
  }
`;
