/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import DefaultUserIcon from '@/images/Profile/defaultUserIcon.svg';
import SettingIcon from '@/images/Profile/settings.svg';
import { userDataAtomType } from '@/states/userData';
import palette from '@/styles/color';
import { ButtonStyle } from '@/styles/common';
import { userInformationType } from '@/types/user';
import { formatISO8601ToNormal } from '@/utils/formatISO8601ToNormal';

const UserProfile = ({
  isMyFeed,
  userData,
  userProfile,
}: {
  isMyFeed: boolean;
  userData: userDataAtomType;
  userProfile: any;
}) => {
  //   isMyFeed 는 추후 타인 프로필 접근시 프로필 편집 글자 대신 팔로우/팔로우해제 버튼으로
  const navigate = useNavigate();

  const [userInformation, setUserInformation] = useState<userInformationType>({
    nickname: '',
    birthDay: '',
    sex: '',
    residence: { value: 0, label: '' },
    job: { value: 0, label: '' },
    worryCategories: [],
    profileImageUrl: '',
  });

  useEffect(() => {
    //     프로필 조회 api
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.user.get.USER,
      path: {
        id: userData.userId,
      },
    })?.then((profileData) => {
      const data = profileData.data;

      const worryCategories = data.userWorryCategories.map((item: any) => ({
        value: item.worryCategory.id,
        label: item.worryCategory.label,
      }));

      const residence = {
        value: data.residence.id,
        label: data.residence.label,
      };

      setUserInformation({
        nickname: data.nickname,
        birthDay: formatISO8601ToNormal(data.birthDate),
        sex: data.sex,
        residence: residence,
        job: { value: data.job.id, label: data.job.label },
        worryCategories: worryCategories,
        profileImageUrl: data.profileImageUrl,
      });
    });
  }, [userData]);

  const handleGoEditProfile = () => {
    navigate(RouteURL.edit_profile);
  };
  return (
    <>
      <img
        src={SettingIcon}
        alt={'설정'}
        className='absolute right-10 top-6'
        onClick={() => navigate(RouteURL.settings)}
      />
      <div className='mt-14 flex flex-col justify-center items-center'>
        <img
          src={
            userInformation.profileImageUrl
              ? userInformation.profileImageUrl
              : DefaultUserIcon
          }
          alt={'유저이미지'}
          className='w-40 h-40 rounded-full'
        />
        <div className='font-bold text-4xl mt-5'>{userInformation.nickname}</div>

        <ProfileUtilButton
          width={8.3}
          height={3.1}
          borderRadius={0.7}
          border={`0.1rem solid ${palette.Secondary}`}
          size={1.2}
          className='mt-5'
          onClick={() => handleGoEditProfile()}
        >
          프로필 편집
        </ProfileUtilButton>
      </div>
    </>
  );
};

export default UserProfile;

const ProfileUtilButton = styled(ButtonStyle)`
  margin-top: 1.3rem;
`;
