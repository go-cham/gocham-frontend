/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import useEditProfile from '@/apis/hooks/users/useEditProfile';
import useMe from '@/apis/hooks/users/useMe';
import AppBar from '@/components/layout/AppBar';
import BottomContinueBar from '@/components/layout/BottomContinueBar';
import CollectNicknameAgeGender from '@/components/user/CollectNicknameAgeGender/CollectNicknameAgeGender';
import CollectRegionJobCategory from '@/components/user/CollectRegionJobCategory/CollectRegionJobCategory';
import { userType } from '@/constants/userTypeEnum';
import { userAtom } from '@/states/userData';
import palette from '@/styles/color';
import {
  PostUserInformationPropsType,
  userInformationType,
} from '@/types/user';
import { formatISO8601ToNormal } from '@/utils/formatISO8601ToNormal';

const EditProfilePage = () => {
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();
  const { user } = useMe();
  const { editProfile, isSuccess, error } = useEditProfile();

  const [userInformation, setUserInformation] = useState<userInformationType>({
    nickname: '',
    birthDay: '--',
    sex: '',
    residence: { value: 0, label: '' },
    job: { value: 0, label: '' },
    worryCategories: [],
  });

  useEffect(() => {
    if (user) {
      setUserInformation({
        nickname: user.nickname,
        birthDay: formatISO8601ToNormal(user.birthDate),
        sex: user.sex,
        residence: { value: user.residence.id, label: user.residence.label },
        job: { value: user.job.id, label: user.job.label },
        worryCategories: user.userWorryCategories.map((item) => ({
          value: item.worryCategory.id,
          label: item.worryCategory.label,
        })),
      });
    }
  }, [user]);

  const handleClickProfileChange = async () => {
    let postUserInformation: PostUserInformationPropsType;
    if (userInfo.userId) {
      postUserInformation = {
        userId: userInfo.userId,
        nickname: userInformation.nickname, // 삭제 예정
        birthDate: userInformation.birthDay,
        sex: userInformation.sex,
        residenceId: userInformation.residence.value,
        jobId: userInformation.job.value,
        worryCategories: userInformation.worryCategories.map(
          (value) => value.value
        ),
      };
      editProfile(postUserInformation);
    }
  };

  if (isSuccess) {
    navigate('/');
  }
  if (error) {
    console.error(error);
  }

  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userType !== userType.activatedUser) navigate(RouteURL.home);
  }, [userInfo]);

  return (
    <>
      <AppBar title={'프로필 편집'} boxShadow={false} />
      <EditProfileWrap>
        {userInformation.birthDay !== '--' && (
          <>
            <CollectNicknameAgeGender
              userInformation={userInformation}
              setUserInformation={setUserInformation}
            />
            <br />
            <br />
            <br />
            <CollectRegionJobCategory
              userInformation={userInformation}
              setUserInformation={setUserInformation}
            />
          </>
        )}
      </EditProfileWrap>
      <EditConfirmBottomBar
        title={'변경 완료'}
        clickAction={handleClickProfileChange}
        buttonColor={palette.Primary}
        fontColor={'white'}
      />
    </>
  );
};

export default EditProfilePage;

const EditProfileWrap = styled.div`
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  position: relative;
  //width: 85%;
  padding-left: 5rem;
  padding-right: 5rem;
  //height: 85vh;
  margin: 4.6rem auto 0;
  overflow-y: scroll;
`;

const EditConfirmBottomBar = styled(BottomContinueBar)`
  font-weight: 700;
`;
