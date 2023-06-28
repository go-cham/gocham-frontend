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

  return (
    <div className="flex flex-col">
      <img
        src={SettingIcon}
        alt={'설정'}
        className="mr-[2.5rem] mt-[1.3rem] w-[32px] self-end"
        onClick={() => navigate(RouteURL.settings)}
      />
      <div className="mt-[1rem] flex flex-col items-center">
        <img
          src={user?.profileImageUrl || DefaultUserIcon}
          alt={'유저이미지'}
          className="h-40 w-40 rounded-full"
        />
        <span className="mt-[0.8rem] text-[2.4rem] font-bold">
          {user?.nickname}
        </span>
        <ProfileUtilButton
          width={8.3}
          height={3.1}
          borderRadius={0.7}
          border={`0.1rem solid ${palette.Secondary}`}
          size={1.2}
          className="mt-5"
          onClick={handleGoEditProfile}
        >
          프로필 편집
        </ProfileUtilButton>
      </div>
    </div>
  );
};

export default UserProfile;

const ProfileUtilButton = styled(ButtonStyle)`
  margin-top: 1.3rem;
`;
