/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import palette from "../../style/color";
import BigFaceIcon from "../../images/Login/big_face.svg";
import Kakao from "../../images/Login/kakao.svg";
import Google from "../../images/Login/google.svg";
import styled from "@emotion/styled";
import { ButtonStyle, FlexRowDiv } from "../../style/common";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/Common/big_logo.svg";
import KakaoText from "../../images/Login/카카오계정으로_시작하기.svg";
import GoogleText from "../../images/Login/구글계정으로_시작하기.svg";
import { useEffect } from "react";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";

const Login = () => {
  const navigate = useNavigate();

  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_APP_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_API;
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = async () => {
    if (navigator.userAgent.indexOf("iPhone") > -1) {
      console.log("플랫폼 확인후 iOS에서만 켜지도록 설정필요");
      alert("iOS의 비공개 릴레이가 켜져있다면 로그인이 되지않습니다.");
    }
    window.location.href = KAKAO_AUTH_URI;
    // console.log(res);
  };

  return (
    <div css={LoginWrap}>
      <img src={Logo} alt={"로고"} className={"로고"} />
      <div className={"메인"}>
        <div>
          <LoginButton
            width={30.7}
            height={4.7}
            size={1.4}
            onClick={() => handleKakaoLogin()}
          >
            <img src={Kakao} alt={"카카오 로그인"} />
            <img src={KakaoText} alt={"카카오 로그인 텍스트"} />
          </LoginButton>
          <br />
          {/*<LoginButton width={30.7} height={4.7} size={1.4}>*/}
          {/*  <img src={Google} alt={"구글 로그인"} />*/}
          {/*  <img src={GoogleText} alt={"구글 로그인 텍스트"} />*/}
          {/*</LoginButton>*/}
          <br />
          {/*<RegisterWrap>*/}
          {/*  <div>아직 회원이 아니신가요?</div>*/}
          {/*  <div onClick={() => navigate("/register/term")}>회원가입</div>*/}
          {/*</RegisterWrap>*/}
        </div>
      </div>
      <img src={BigFaceIcon} className={"BigFace"} alt={"캐릭터"} />
    </div>
  );
};

export default Login;

const RegisterWrap = styled(FlexRowDiv)`
  font-size: 1.2rem;
  color: ${palette.Gray4};
  & > :nth-child(1) {
    margin-right: 2.3rem;
  }
`;

const LoginButton = styled(ButtonStyle)`
  background-color: ${palette.Background};
  border-radius: 0.5rem;
  & > img {
    margin-right: 1.1rem;
  }
`;

const LoginWrap = css`
  position: relative;
  width: 100%;
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
  background-color: ${palette.Primary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  & .로고 {
    margin-top: 5rem;
    margin-bottom: 1rem;
    width: 95%;
    max-width: 40rem;
  }
  & > .메인 {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  & > .BigFace {
    bottom: 0;
    width: 100%;
  }
`;
