/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import backgroundImage from '@/images/GNB/GNB_bar_icon.svg';
import AddPostIcon from '@/images/GNB/add_post_icon.svg';
import SelectHomeIcon from '@/images/GNB/selected_home_icon.svg';
import UnselectProfileIcon from '@/images/GNB/unselect_profile_icon.svg';
import UnselectHomeIcon from '@/images/GNB/unselect_home_icon.svg';
import SelectProfileIcon from '@/images/GNB/selected_profile_icon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteURL } from '@/App';
import { MAX_WIDTH } from '@/constants/viewSize';

const GNB = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState('posting');
  useEffect(() => {
    if (location.pathname.includes('/user')) setSelectedMenu('user');
    else {
      setSelectedMenu('posting');
    }
  }, [location.pathname]);

  const handleGoUserPage = () => {
    navigate(RouteURL.user);
  };

  const handleGoWrite = () => {
    navigate(RouteURL.write);
  };
  return (
    <GNBComponent>
      {' '}
      <GNBBackground src={backgroundImage} alt={'배경'} />
      <GNBBackgroundWrap>
        {selectedMenu === 'posting' ? (
          <SelectButton image={SelectHomeIcon} />
        ) : (
          <SelectButton
            image={UnselectHomeIcon}
            onClick={() => navigate('/')}
          />
        )}
        <AddButton image={AddPostIcon} onClick={() => handleGoWrite()} />
        {selectedMenu === 'user' ? (
          <SelectButton image={SelectProfileIcon} />
        ) : (
          <SelectButton
            image={UnselectProfileIcon}
            onClick={() => handleGoUserPage()}
          />
        )}
      </GNBBackgroundWrap>
    </GNBComponent>
  );
};

export default GNB;

const GNBComponent = styled.div`
  position: fixed;
  margin: 0 auto;
  max-width: ${MAX_WIDTH};
  bottom: -0.5rem;
`;

const GNBBackgroundWrap = styled.div`
  width: 100%;
  bottom: 3.3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
  position: absolute;
`;

const AddButton = styled.div<{ image: string }>`
  background-image: url(${(props) => props.image});
  width: 5.7rem;
  height: 5.7rem;
  background-size: contain; /* contain으로 설정합니다. */
  background-repeat: no-repeat;
`;

const SelectButton = styled.div<{ image: string }>`
  background-image: url(${(props) => props.image});
  width: 3.2rem;
  height: 3.2rem;
  background-size: contain; /* contain으로 설정합니다. */
`;

const GNBBackground = styled.img`
  //width: 100%;
  //width: 100%;
  width: ${MAX_WIDTH};
  position: relative;
  bottom: 0;
  margin: 0 auto;
  //padding-bottom: ${(1 / 15) *
  100}%; /* 이미지의 가로세로 비율에 맞춰서 padding-bottom 값을 계산합니다. 예를 들어, 16:9 비율의 이미지는 9/16 * 100% = 56.25%가 됩니다. */
  filter: drop-shadow(0px 0px 25px rgba(42, 45, 55, 0.1));
`;

// const GNBBackground = styled.div<{ image: string }>`
//   background-image: url(${(props) => props.image});
//   width: 100vw;
//   //padding-bottom: ${(1 / 15) *
//   100}%; /* 이미지의 가로세로 비율에 맞춰서 padding-bottom 값을 계산합니다. 예를 들어, 16:9 비율의 이미지는 9/16 * 100% = 56.25%가 됩니다. */
//   filter: drop-shadow(0px 0px 25px rgba(42, 45, 55, 0.1));
//   background-repeat: no-repeat;
//   background-size: contain; /* contain으로 설정합니다. */
//   background-position: center;
//   position: absolute;
//   bottom: 0;
//   display: flex;
//   justify-content: space-evenly;
//   align-items: end;
// `;
