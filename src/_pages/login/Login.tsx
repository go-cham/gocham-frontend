/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Logo from '@/images/Common/big_logo.svg';
import GochamCharacter from '@/images/Login/GochamCharacter.svg';
import KakaoText from '@/images/Login/카카오계정으로_시작하기.svg';
import palette from '@/styles/color';

declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}
const Login = () => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }

  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_API;

  const handleKakaoLogin = async () => {
    if (navigator.userAgent.indexOf('iPhone') > -1) {
      alert('iOS의 비공개 릴레이가 켜져있다면 로그인이 되지않습니다.');
    }
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
    });
  };

  return (
    <div css={LoginWrap}>
      <img src={Logo} alt={'로고'} className={'로고'} />
      <div className={'메인'}>
        <div>
          <img
            src={KakaoText}
            alt={'카카오 로그인 텍스트'}
            onClick={() => handleKakaoLogin()}
          />
          <br />
          <br />
        </div>
      </div>
      <img src={GochamCharacter} className={'BigFace'} alt={'캐릭터'} />
    </div>
  );
};

export default Login;

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
    margin-bottom: 7.5rem;
  }
`;
