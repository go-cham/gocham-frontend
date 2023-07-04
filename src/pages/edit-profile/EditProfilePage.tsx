import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useEditProfile from '@/apis/hooks/users/useEditProfile';
import useUser from '@/apis/hooks/users/useUser';
import BottomContinueBar from '@/components/layout/BottomContinueBar';
import TopAppBar from '@/components/layout/TopAppBar';
import CollectNicknameAgeGender from '@/components/user/CollectNicknameAgeGender/CollectNicknameAgeGender';
import CollectRegionJobCategory from '@/components/user/CollectRegionJobCategory/CollectRegionJobCategory';
import withAuth from '@/components/withAuth';
import { userAtom } from '@/states/userData';
import palette from '@/styles/color';
import {
  PostUserInformationPropsType,
  userInformationType,
} from '@/types/user';
import { formatISO8601ToNormal } from '@/utils/formatISO8601ToNormal';

function EditProfilePage() {
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();
  const { user } = useUser();
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
    if (
      user &&
      user.birthday &&
      user.sex &&
      user.residence &&
      user.job &&
      user.worryCategories
    ) {
      setUserInformation({
        nickname: user.nickname,
        birthDay: formatISO8601ToNormal(user.birthday),
        sex: user.sex,
        residence: user.residence,
        job: user.job,
        worryCategories: user.worryCategories,
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

  return (
    <div className="flex h-full flex-col">
      <TopAppBar title={'프로필 편집'} boxShadow={false} />

      <div className="mt-[4.8rem] flex-1 space-y-[3rem] overflow-y-scroll px-20">
        {userInformation.birthDay !== '--' && (
          <>
            <CollectNicknameAgeGender onSubmit={() => console.log('temp')} />
            <CollectRegionJobCategory onSubmit={() => console.log('temp')} />
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
}

export default withAuth(EditProfilePage, { block: 'unauthenticated' });
