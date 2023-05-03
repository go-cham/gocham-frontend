// 리다이렉트될 화면

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import getUserInfo from "../../utils/getUserInfo";
import { RouteURL } from "../../App";
import { alertMessage } from "../../utils/alertMessage";
import { useAtom } from "jotai/index";
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
      try {
        if (code) {
          const res = await ApiConfig.request({
            method: HttpMethod.GET,
            url: EndPoint.login.get.KAKAO_AUTH,
            query: { code },
          });
          const data = res && res.data;
          window.localStorage.setItem("token", data.token);
          const userData = await getUserInfo();
          setUserData(userData);

          if (userData?.userType === "onceUser") {
            console.log("약관 미동의 유저");
            navigate(RouteURL.register_term);
          } else if (userData?.userType === "error") {
            alert(alertMessage.error.needContantAdmin);
          } else {
            console.log("로그인 성공~");
            navigate(RouteURL.home);
          }
        }
      } catch (e) {
        console.error(e);
        alert("로그인 과정에서 에러가 발생했습니다. 개발자에게 문의해주세요.");
        navigate("/login");
      }
    })();
  }, []);
  return (
    <>
      {" "}
      <RegisterTermWrap>
        {" "}
        <img
          src={BackButton}
          alt={"뒤로가기"}
          onClick={() => navigate("/login")}
        />
        <div className={"약관문구"}>
          환영합니다!
          <br />
          서비스 이용약관에
          <br />
          동의해주세요.
        </div>
      </RegisterTermWrap>
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
