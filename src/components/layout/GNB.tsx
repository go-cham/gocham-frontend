import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import backgroundImage from '@/images/GNB/GNB_bar_icon.svg';
import AddPostIcon from '@/images/GNB/add_post_icon.svg';
import SelectHomeIcon from '@/images/GNB/selected_home_icon.svg';
import SelectProfileIcon from '@/images/GNB/selected_profile_icon.svg';

const GNB = () => {
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
  return (
    <footer className="absolute -bottom-[0.4rem] mx-auto w-full">
      <img
        className="mx-auto w-full max-w-[43rem] drop-shadow-[0_0_25px_rgba(42,45,55,0.1)]"
        src={backgroundImage}
        alt="gnb-background"
      />
      <div className="absolute bottom-[3.3rem] flex w-full items-baseline justify-evenly">
        {/* HomePage */}
        <button
          onClick={handleGoHome}
          className={selectedMenu === 'posting' ? 'pointer-events-none' : ''}
        >
          <img
            className={`w-[3.2rem] ${selectedMenu !== 'posting' && 'opacity-20'}
          `}
            src={SelectHomeIcon}
            alt="home"
          />
        </button>
        {/* Add */}
        <button onClick={handleGoWrite}>
          <img className="w-[5.7rem]" src={AddPostIcon} alt="add-post" />
        </button>
        {/* Profile */}
        <button
          onClick={handleGoUserPage}
          className={selectedMenu === 'user' ? 'pointer-events-none' : ''}
        >
          <img
            className={`w-[3.2rem] ${selectedMenu !== 'user' && 'opacity-20'}`}
            src={SelectProfileIcon}
            alt="profile"
          />
        </button>
      </div>
    </footer>
  );
};

export default GNB;
