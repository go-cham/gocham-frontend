// 리다이렉트될 화면

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";

const LoginOauthKakao = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
          console.log(`res:${res}`);
          // 저장 로직 구현 필요
          // window.localStorage.setItem("token", token);
          // navigate("/");
          // isUserRegistered()
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return <>hola!</>;
};

export default LoginOauthKakao;
