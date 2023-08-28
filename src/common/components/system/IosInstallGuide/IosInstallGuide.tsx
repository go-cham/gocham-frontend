import { useEffect, useState } from 'react';
import Snackbar from '@/common/components/ui/modal/Snackbar';
import {
  isIOS,
  isInStandaloneMode,
  isSafari,
} from '@/common/utils/environment';
import useUser from '@/features/user/queries/useUser';

export default function IosInstallGuide() {
  const [showGuide, setShowGuide] = useState(false);
  const { user } = useUser();

  const localStorageKey = 'visited';
  const isFirstVisit = () => {
    return !localStorage.getItem(localStorageKey);
  };

  useEffect(() => {
    const isUserRegistered = user?.joinStatus === 'activated';
    if (
      isIOS() &&
      !isInStandaloneMode() &&
      isSafari() &&
      isUserRegistered &&
      isFirstVisit()
    ) {
      setShowGuide(true);
    }
  }, [user]);

  return showGuide ? (
    <Snackbar
      className="absolute bottom-[10rem] left-1/2 z-[1000] -translate-x-1/2"
      actionText="확인"
      onClick={() => {
        setShowGuide(false);
        localStorage.setItem(localStorageKey, 'true');
      }}
    >
      하단의
      <ShareIcon />
      클릭 후 &apos;홈 화면에 추가&apos;를 누르시면, iPhone의 홈에 어플을
      설치하실 수 있습니다.
    </Snackbar>
  ) : null;
}

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      enableBackground="new 0 0 50 50"
      className="inline-block h-10 w-10 fill-[#007AFF]"
    >
      <path d="M30.3 13.7L25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z" />
      <path d="M24 7h2v21h-2z" />
      <path d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z" />
    </svg>
  );
}
