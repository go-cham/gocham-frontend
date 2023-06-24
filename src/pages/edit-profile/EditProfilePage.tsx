/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import AppBar from '@/components/layout/AppBar';
import BottomContinueBar from '@/components/layout/BottomContinueBar';
import { userType } from '@/constants/userTypeEnum';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import {
  postUserInformationPropsType,
  userInformationType,
} from '@/pages/collect-information/CollectInformationPage';
import CollectNicknameAgeGender from '@/pages/collect-information/CollectNicknameAgeGender/CollectNicknameAgeGender';
import CollectRegionJobCategory from '@/pages/collect-information/CollectRegionJobCategory/CollectRegionJobCategory';
import { userAtom } from '@/states/userData';
import palette from '@/styles/color';
import { formatISO8601ToNormal } from '@/utils/formatISO8601ToNormal';
import getUserInfo from '@/utils/getUserInfo';

const EditProfilePage = () => {
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userType !== userType.activatedUser) navigate(RouteURL.home);
  }, [userInfo]);

  const [userInformation, setUserInformation] = useState<userInformationType>({
    nickname: '',
    birthDay: '--',
    sex: '',
    residence: { value: 0, label: '' },
    job: { value: 0, label: '' },
    worryCategories: [],
  });

  useEffect(() => {
    //     프로필 조회 api
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.user.get.USER,
      path: {
        id: userInfo.userId,
      },
    })?.then((profileData) => {
      const data = profileData.data;

      // console.log(data);
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
      });
    });
  }, []);

  const handleClickProfileChange = async () => {
    let postUserInformation: postUserInformationPropsType;
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
      console.log(postUserInformation);
      try {
        const res = await ApiConfig.request({
          method: HttpMethod.PATCH,
          url: EndPoint.user.patch.USER,
          data: postUserInformation,
        });
        const userInfo = await getUserInfo();
        navigate('/');
      } catch (e) {
        console.error(e);
      }
    }
  };
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
  height: 85vh;
  margin: 4.6rem auto 0;
  overflow-y: scroll;
`;

const EditConfirmBottomBar = styled(BottomContinueBar)`
  font-weight: 700;
`;