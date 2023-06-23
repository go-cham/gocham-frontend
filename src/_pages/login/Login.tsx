import Logo from '@/images/Common/big_logo.svg';
import GochamCharacter from '@/images/Login/GochamCharacter.svg';
import KakaoText from '@/images/Login/카카오계정으로_시작하기.svg';

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
    <div className="flex h-full w-full flex-col items-center bg-primary pt-[5rem]">
      <img src={Logo} alt={'로고'} />
      <img
        src={KakaoText}
        alt={'카카오 로그인 텍스트'}
        onClick={handleKakaoLogin}
        className="mt-[6.4rem]"
      />
      <img src={GochamCharacter} className="mt-[6.6rem]" alt={'캐릭터'} />
    </div>
  );
};

export default Login;
