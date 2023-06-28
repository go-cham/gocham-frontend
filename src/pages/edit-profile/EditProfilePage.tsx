import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useEditProfile from '@/apis/hooks/users/useEditProfile';
import useMe from '@/apis/hooks/users/useMe';
import BottomContinueBar from '@/components/layout/BottomContinueBar';
import TopAppBar from '@/components/layout/TopAppBar';
import CollectNicknameAgeGender from '@/components/user/CollectNicknameAgeGender/CollectNicknameAgeGender';
import CollectRegionJobCategory from '@/components/user/CollectRegionJobCategory/CollectRegionJobCategory';
import { RouteURL } from '@/constants/route-url';
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

  console.log(userInformation);
  return (
    <div className="flex h-full flex-col">
      <TopAppBar title={'프로필 편집'} boxShadow={false} />

      <div className="mt-[4.8rem] flex-1 space-y-[3rem] overflow-y-scroll px-20">
        {userInformation.birthDay !== '--' && (
          <>
            <CollectNicknameAgeGender
              userInformation={userInformation}
              setUserInformation={setUserInformation}
            />
            <CollectRegionJobCategory
              userInformation={userInformation}
              setUserInformation={setUserInformation}
            />
          </>
        )}
      </div>

      <BottomContinueBar
        title={'변경 완료'}
        clickAction={handleClickProfileChange}
        buttonColor={palette.Primary}
        fontColor={'white'}
        height={10.5}
      />
    </div>
  );
};

export default EditProfilePage;
