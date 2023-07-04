import { useNavigate } from 'react-router-dom';

import BackIcon from '@/components/icons/BackIcon';
import withAuth from '@/components/withAuth';
import Logo from '@/images/Common/big_logo.svg';
import GochamCharacter from '@/images/Login/GochamCharacter.svg';
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
    <div className="relative flex h-full w-full flex-col items-center bg-custom-main-500">
      <BackIcon
        onClick={() => navigate('/')}
        className="ml-[0.9rem] cursor-pointer self-start"
        color="white"
      />
      <img
        src={Logo}
        alt={'로고'}
        className="mt-[2vh] w-full max-w-[39.3rem]"
      />
      <button className="mt-[4vh]">
        <img
          src={KakaoText}
          alt={'카카오 로그인 텍스트'}
          onClick={handleKakaoLogin}
          className="w-full max-w-[30.6rem]"
        />
      </button>
      <img
        src={GochamCharacter}
        className="absolute bottom-[12vh]"
        alt={'캐릭터'}
      />
    </div>
  );
}

export default withAuth(LoginPage, { block: 'activated' });
