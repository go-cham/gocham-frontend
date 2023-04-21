/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import palette from "../../style/color";
import BigFaceIcon from "../../images/Login/big_face.png";
import Kakao from "../../images/Login/kakao.png";
import Google from "../../images/Login/google.png";
import styled from "@emotion/styled";
import { ButtonStyle, FlexRowDiv } from "../../style/common";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div css={LoginWrap}>
      <div className={"메인"}>
        <h1>고민의 참견</h1>
        <div>
          <LoginButton width={30.7} height={4.7} size={1.4}>
            <img src={Kakao} alt={"카카오 로그인"} />
            카카오 계정으로 로그인
          </LoginButton>
          <br />
          <LoginButton width={30.7} height={4.7} size={1.4}>
            <img src={Google} alt={"구글 로그인"} />
            구글 계정으로 로그인
          </LoginButton>
          <br />
          <RegisterWrap>
            <div>아직 회원이 아니신가요?</div>
            <div onClick={() => navigate("/register/term")}>회원가입</div>
          </RegisterWrap>
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
  width: 100vw;
  height: 100vh;
  background-color: ${palette.Primary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  & > .메인 {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  & > .BigFace {
    //position: absolute;
    bottom: 0;
    height: 43.8rem;
    width: 100%;
  }
`;
