import { useLocation, useNavigate } from 'react-router-dom';

import HomeIcon from '@/components/icons/HomeIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import ProfileIcon from '@/components/icons/ProfileIcon';
import { RouteURL } from '@/constants/route-url';
import backgroundImage from '@/images/GNB/GNB_bar_icon.svg';
import { customColors } from '@/styles/colors';

interface BottomAppBarProps {
  onScrollToTop?: () => void;
}

export default function BottomAppBar({ onScrollToTop }: BottomAppBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname === RouteURL.home ? 'home' : 'user';

  const handleGoHome = () => {
    navigate(RouteURL.home);
  };

  const handleGoUserPage = () => {
    navigate(RouteURL.user);
  };

  const handleGoWrite = () => {
    navigate(RouteURL.write);
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
        <button onClick={currentPage === 'home' ? onScrollToTop : handleGoHome}>
          <HomeIcon
            color={
              currentPage !== 'home'
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
          className={currentPage === 'user' ? 'pointer-events-none' : ''}
        >
          <ProfileIcon
            color={
              currentPage !== 'user'
                ? customColors.text.subExplain['400']
                : customColors.text.subTitle['700']
            }
          />
        </button>
      </div>
    </footer>
  );
}
