import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import AppBar from '@/components/layout/AppBar';
import BottomContinueBar from '@/components/layout/BottomContinueBar';
import CollectNicknameAgeGender from '@/components/user/CollectNicknameAgeGender/CollectNicknameAgeGender';
import CollectRegionJobCategory from '@/components/user/CollectRegionJobCategory/CollectRegionJobCategory';
import { userType } from '@/constants/userTypeEnum';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import { userAtom } from '@/states/userData';
import palette from '@/styles/color';
import {
  PostUserInformationPropsType,
  userInformationType,
} from '@/types/user';
import getUserInfo from '@/utils/getUserInfo';

const CollectInformationPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useAtom(userAtom);

  const [page, setPage] = useState(1);
  const [readyToNext, setReadyToNext] = useState(false);
  const [userInformation, setUserInformation] = useState<userInformationType>({
    nickname: '',
    birthDay: '--',
    sex: '',
    residence: { value: 0, label: '' },
    job: { value: 0, label: '' },
    worryCategories: [],
  });

  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userType === userType.activatedUser) navigate(RouteURL.home);
  }, [userInfo]);

  useEffect(() => {
    if (
      page === 1 &&
      userInformation.nickname &&
      userInformation.nickname.length <= 10 &&
      userInformation.sex &&
      userInformation.birthDay &&
      Number(userInformation.birthDay.split('-')[0]) > 1900 &&
      Number(userInformation.birthDay.split('-')[0]) < 2006 &&
      Number(userInformation.birthDay.split('-')[1]) >= 1 &&
      Number(userInformation.birthDay.split('-')[1]) <= 12 &&
      Number(userInformation.birthDay.split('-')[2]) >= 1 &&
      Number(userInformation.birthDay.split('-')[2]) <= 31
    ) {
      setReadyToNext(true);
    } else {
      setReadyToNext(false);
    }
    if (
      page === 2 &&
      userInformation.residence &&
      userInformation.job.value !== 0 &&
      userInformation.worryCategories.length !== 0
    ) {
      setReadyToNext(true);
    }
  }, [userInformation]);

  const uploadCollectData = async () => {
    // console.log("시작하기!");
    let postUserInformation: PostUserInformationPropsType;
    if (userInfo.userId) {
      postUserInformation = {
        userId: userInfo.userId,
        nickname: userInformation.nickname, // 삭제 예정
        birthDate: userInformation.birthDay.toString(),
        sex: userInformation.sex,
        residenceId: userInformation.residence.value,
        jobId: userInformation.job.value,
        worryCategories: userInformation.worryCategories.map(
          (value) => value.value
        ),
      };
    } else {
      // console.log("유저정보를 새롭게 조회합니다.");
      const newUserInfo = await getUserInfo();
      postUserInformation = {
        userId: newUserInfo.userId,
        nickname: userInformation.nickname, // 삭제 예정
        birthDate: userInformation.birthDay.toString(),
        sex: userInformation.sex,
        residenceId: userInformation.residence.value,
        jobId: userInformation.job.value,
        worryCategories: userInformation.worryCategories.map(
          (value) => value.value
        ),
      };
    }
    // console.log(postUserInformation);
    try {
      const res = await ApiConfig.request({
        method: HttpMethod.PATCH,
        url: EndPoint.user.patch.USER,
        data: postUserInformation,
      });
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const navigateBack = () => {
    //   page 1인 경우
    if (page === 1) {
      navigate(-1);
    }
    if (page === 2) {
      setPage(1);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <AppBar
        title={''}
        boxShadow={false}
        navigateAction={() => navigateBack()}
      />
      <div className="mx-auto w-[90%] flex-1">
        <h1 className="mt-[4.2rem] text-[2.7rem] font-bold text-secondary">
          수많은 고민들이 👀
          <br />
          당신을 기다리고 있어요!
        </h1>
        <section className="mt-[2.9rem]">
          {page === 1 && (
            <CollectNicknameAgeGender
              userInformation={userInformation}
              setUserInformation={setUserInformation}
            />
          )}
          {page === 2 && (
            <CollectRegionJobCategory
              userInformation={userInformation}
              setUserInformation={setUserInformation}
            />
          )}
        </section>
      </div>
      {/**/}
      {/* 각 페이지 항목 조건비교해서 색상 및 문구 표시 구현 필요 */}
      {page === 1 && !readyToNext && (
        <BottomContinueBar
          title={'다음'}
          height={11.2}
          boxShadow={false}
          buttonColor={'rgba(42, 45, 55, 0.1)'}
          fontColor={'rgba(42, 45, 55, 0.34)'}
        />
      )}
      {page === 1 && readyToNext && (
        <BottomContinueBar
          title={'다음'}
          height={11.2}
          boxShadow={false}
          buttonColor={palette.Primary}
          fontColor={'white'}
          clickAction={() => {
            setPage(2);
            setReadyToNext(false);
          }}
        />
      )}
      {page === 2 && !readyToNext && (
        <BottomContinueBar
          title={'고참 시작하기'}
          height={11.2}
          boxShadow={false}
          buttonColor={'rgba(42, 45, 55, 0.1)'}
          fontColor={'rgba(42, 45, 55, 0.34)'}
        />
      )}
      {page === 2 && readyToNext && (
        <BottomContinueBar
          title={'고참 시작하기'}
          height={11.2}
          boxShadow={false}
          buttonColor={palette.Primary}
          fontColor={'white'}
          clickAction={uploadCollectData}
        />
      )}
    </div>
  );
};

export default CollectInformationPage;
