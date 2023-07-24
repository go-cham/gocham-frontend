import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeIcon from '@/components/icons/HomeIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import ProfileIcon from '@/components/icons/ProfileIcon';
import { RouteURL } from '@/constants/route-url';
import backgroundImage from '@/images/GNB/GNB_bar_icon.svg';
import { customColors } from '@/styles/colors';

export default function BottomAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState('posting');
  useEffect(() => {
    if (location.pathname.includes('/user')) {
      setSelectedMenu('user');
    } else {
      setSelectedMenu('posting');
    }
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate(RouteURL.home);
  };

  const handleGoUserPage = () => {
    navigate(RouteURL.user);
  };

  const handleGoWrite = () => {
    navigate(RouteURL.write);
  };

  const handleGoUp = () => {
    const list = document.querySelector('#home-post-list');
    if (list) {
      list.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="absolute bottom-0 z-10 w-full">
      <img
        className="shadow-dock mx-auto w-full"
        src={backgroundImage}
        alt="gnb-background"
      />
      <div className="absolute -top-[0.6rem] flex w-full items-end justify-evenly">
        {/* HomePage */}
        <button
          onClick={selectedMenu === 'posting' ? handleGoUp : handleGoHome}
        >
          <HomeIcon
            color={
              selectedMenu !== 'posting'
                ? customColors.text.subExplain['400']
                : customColors.text.subTitle['700']
            }
          />
        </button>

        {/* Add */}
        <button
          onClick={handleGoWrite}
          className="flex h-[5.7rem] w-[5.7rem] items-center justify-center rounded-full bg-mainSub-main-500"
        >
          <PlusIcon color="white" className="h-[3.2rem] w-[3.2rem]" />
        </button>

        {/* Profile */}
        <button
          onClick={handleGoUserPage}
          className={selectedMenu === 'user' ? 'pointer-events-none' : ''}
        >
          <ProfileIcon
            color={
              selectedMenu !== 'user'
                ? customColors.text.subExplain['400']
                : customColors.text.subTitle['700']
            }
          />
        </button>
      </div>
    </footer>
  );
}
