import { useNavigate } from 'react-router-dom';

import BackIcon from '@/components/icons/BackIcon';
import withAuth from '@/components/withAuth';
import LoginWrapper from '@/images/Login/loginWrapper.svg';
import LoginWrapperText2 from '@/images/Login/loginWrapperText2.svg';
import LoginWrapperText1 from '@/images/Login/loginWrapperText.svg';
import KakaoText from '@/images/Login/카카오계정으로_시작하기.svg';

declare global {
  interface Window {
    Kakao: any;
  }
}

function LoginPage() {
  const navigate = useNavigate();

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
    <div
      className="relative flex h-full w-full flex-col"
      style={{
        backgroundImage: `url(${LoginWrapper})`,
        backgroundSize: 'cover',
      }}
    >
      <BackIcon
        onClick={() => navigate('/')}
        className="ml-[0.9rem] cursor-pointer self-start"
        color="black"
      />
      <div className="ml-[2.5rem] mt-[3.3rem] h-4/6">
        <img src={LoginWrapperText1} alt={'로그인 화면 텍스트1'} />
        <img
          src={LoginWrapperText2}
          alt={'로그인 화면 텍스트2'}
          className="mt-[1.5rem]"
        />
      </div>
      <button className="mt-[4vh] flex w-full justify-center">
        <img
          src={KakaoText}
          alt={'카카오 로그인 텍스트'}
          onClick={handleKakaoLogin}
          className="w-full max-w-[30.6rem]"
        />
      </button>
    </div>
  );
}

export default withAuth(LoginPage, { block: 'activated' });
