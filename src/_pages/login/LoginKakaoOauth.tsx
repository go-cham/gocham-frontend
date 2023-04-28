// 리다이렉트될 화면

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";

const LoginKakaoOauth = () => {
  const navigate = useNavigate();

  // 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    (async () => {
      try {
        const res = ApiConfig.request({
          method: HttpMethod.GET,
          url: EndPoint.login.get.KAKAO_AUTH,
        });
        console.log(res);
        // window.localStorage.setItem("token", token);
        // navigate("/main");
      } catch (e) {
        console.error(e);
        navigate("/login");
      }
    })();
  }, []);
  return <></>;
};

export default LoginKakaoOauth;
