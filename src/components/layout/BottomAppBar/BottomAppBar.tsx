import { useNavigate } from 'react-router-dom';

import HomeIcon from '@/components/icons/HomeIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import ProfileIcon from '@/components/icons/ProfileIcon';
import { RouteURL } from '@/constants/route-url';
import backgroundImage from '@/images/GNB/GNB_bar_icon.svg';
import { customColors } from '@/styles/colors';

interface BottomAppBarProps {
  currentPage: 'home' | 'user';
  onScrollToTop?: () => void;
}

export default function BottomAppBar({
  onScrollToTop,
  currentPage,
}: BottomAppBarProps) {
  const navigate = useNavigate();

  const handleHomeIconClick = () => {
    if (currentPage === 'home') {
      onScrollToTop && onScrollToTop();
    } else {
      navigate(RouteURL.home);
    }
  };

  const handleUserIconClick = () => {
    if (currentPage !== 'user') {
      navigate(RouteURL.user);
    }
  };

  const handleAddIconClick = () => {
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
        <button onClick={handleHomeIconClick}>
          <HomeIcon
            color={
              currentPage !== 'home'
                ? customColors.text.subExplain['400']
                : customColors.text.subTitle['700']
            }
          />
        </button>

        <button
          onClick={handleAddIconClick}
          className="flex aspect-square w-[14.5%] items-center justify-center rounded-full bg-mainSub-main-500"
        >
          <PlusIcon color="white" className="h-[3.2rem] w-[3.2rem]" />
        </button>

        <button
          onClick={handleUserIconClick}
          className={`${currentPage === 'user' ? 'pointer-events-none' : ''}`}
        >
          <ProfileIcon
            color={
              currentPage === 'user'
                ? customColors.text.subTitle['700']
                : customColors.text.subExplain['400']
            }
          />
        </button>
      </div>
    </footer>
  );
}
