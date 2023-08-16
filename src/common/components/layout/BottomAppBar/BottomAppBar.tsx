import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

import backgroundImage from '@/common/assets/images/GNB/GNB_bar_icon.svg';
import HomeIcon from '@/common/components/icons/HomeIcon';
import PlusIcon from '@/common/components/icons/PlusIcon';
import ProfileIcon from '@/common/components/icons/ProfileIcon';
import { customColors } from '@/styles/colors';

interface BottomAppBarProps {
  onScrollToTop?: () => void;
}

export function BottomAppBar({ onScrollToTop }: BottomAppBarProps) {
  const navigate = useNavigate();
  const currentPage = location.pathname === '/' ? 'home' : 'user';

  const handleHomeIconClick = () => {
    if (currentPage === 'home') {
      onScrollToTop && onScrollToTop();
    } else {
      navigate('/');
    }
  };

  const handleUserIconClick = () => {
    if (currentPage !== 'user') {
      navigate('/user');
    }
  };

  const handleAddIconClick = () => {
    navigate('/write');
  };

  return (
    <footer className="absolute bottom-0 z-10 w-full">
      <img
        src={backgroundImage}
        alt="background"
        className="shadow-dock mx-auto w-full"
      />
      <div className="absolute -top-[0.6rem] flex w-full items-end justify-evenly">
        <button onClick={handleHomeIconClick}>
          <HomeIcon
            color={
              currentPage !== 'home'
                ? customColors.text.subExplain['400']
                : customColors.text.subTitle['700']
            }
            className={`${!isMobile && 'relative bottom-[0.5rem] scale-[1.2]'}`}
          />
        </button>

        <button
          onClick={handleAddIconClick}
          className="flex aspect-square w-[14.5%] items-center justify-center rounded-full bg-mainSub-main-500"
        >
          <PlusIcon
            color="white"
            className={`${
              isMobile ? 'h-[3.2rem] w-[3.2rem]' : 'h-[4.1rem] w-[4.1rem]'
            }`}
          />
        </button>

        <button
          onClick={handleUserIconClick}
          className={`${currentPage === 'user' && 'pointer-events-none'}`}
        >
          <ProfileIcon
            color={
              currentPage === 'user'
                ? customColors.text.subTitle['700']
                : customColors.text.subExplain['400']
            }
            className={`${!isMobile && 'relative bottom-[0.5rem] scale-[1.2]'}`}
          />
        </button>
      </div>
    </footer>
  );
}
