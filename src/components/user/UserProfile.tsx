/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import useMe from '@/apis/hooks/users/useMe';
import DefaultUserIcon from '@/images/Profile/defaultUserIcon.svg';
import SettingIcon from '@/images/Profile/settings.svg';
import palette from '@/styles/color';
import { ButtonStyle } from '@/styles/common';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useMe();

  const handleGoEditProfile = () => {
    navigate(RouteURL.edit_profile);
  };

  console.log(user);

  return (
    <>
      <SettingImg
        src={SettingIcon}
        alt={'설정'}
        className={'설정'}
        onClick={() => navigate(RouteURL.settings)}
      />
      <UserProfileWrap>
        <img
          src={user?.profileImageUrl || DefaultUserIcon}
          alt={'유저이미지'}
          className={'유저이미지'}
        />
        <div className={'유저이름'}>{user?.nickname}</div>
        <ProfileUtilButton
          width={8.3}
          height={3.1}
          borderRadius={0.7}
          border={`0.1rem solid ${palette.Secondary}`}
          size={1.2}
          onClick={handleGoEditProfile}
        >
          프로필 편집
        </ProfileUtilButton>
      </UserProfileWrap>
    </>
  );
};

export default UserProfile;

const UserProfileWrap = styled.div`
  margin-top: 5.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .유저이미지 {
    width: 10rem;
    height: 10rem;
    border-radius: 10rem;
  }
  & .유저이름 {
    font-weight: 700;
    font-size: 2.4rem;
    margin-top: 1.3rem;
  }
`;

const SettingImg = styled.img`
  position: absolute;
  right: 2.5rem;
  top: 1.3rem;
`;

const ProfileUtilButton = styled(ButtonStyle)`
  margin-top: 1.3rem;
`;
