import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useEditProfile from '@/apis/hooks/users/useEditProfile';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import DockedButton from '@/components/ui/buttons/DockedButton';
import CollectNicknameAgeGender from '@/components/user/CollectNicknameAgeGender/CollectNicknameAgeGender';
import CollectRegionJobCategory from '@/components/user/CollectRegionJobCategory/CollectRegionJobCategory';
import withAuth from '@/components/withAuth';
import { OptionType } from '@/constants/Options';
import { Gender } from '@/types/user';
import { formatISO8601ToNormal } from '@/utils/formatISO8601ToNormal';

function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { editProfile, isSuccess } = useEditProfile();
  const [isNicknameAgeGenderValid, setIsNicknameAgeGenderValid] =
    useState(true);
  const [isRegionJobCategoryValid, setIsRegionJobCategoryValid] =
    useState(true);

  const [userInformation, setUserInformation] = useState({
    nickname: user?.nickname,
    birthday: user?.birthday ? formatISO8601ToNormal(user.birthday) : '',
    sex: user?.sex,
    residence: user?.residence,
    job: user?.job,
    worryCategories: user?.worryCategories,
  });

  if (!user) {
    return null;
  }

  const hasEdited = () => {
    return (
      userInformation.nickname !== user.nickname ||
      (user.birthday &&
        userInformation.birthday !== formatISO8601ToNormal(user.birthday)) ||
      userInformation.sex !== user.sex ||
      userInformation.residence?.value !== user.residence?.value ||
      userInformation.job !== user.job ||
      userInformation.worryCategories
        ?.sort((a, b) => a.value - b.value)
        .map((v) => v.value)
        .join(',') !==
        user?.worryCategories
          ?.sort((a, b) => a.value - b.value)
          .map((v) => v.value)
          .join(',')
    );
  };

  const handleNicknameAgeGenderChange = (
    nickname: string,
    birthday: { year: string; month: string; day: string },
    gender: Gender | null
  ) => {
    setUserInformation({
      ...userInformation,
      nickname: nickname || userInformation.nickname,
      birthday:
        birthday.year && birthday.month && birthday.day
          ? `${birthday.year}-${birthday.month.padStart(
              2,
              '0'
            )}-${birthday.day.padStart(2, '0')}`
          : userInformation.birthday,
      sex: gender || userInformation.sex,
    });
  };

  const handleRegionJobCategoryChange = (
    residence?: OptionType,
    job?: string,
    categories?: OptionType[]
  ) => {
    setUserInformation({
      ...userInformation,
      residence: residence || userInformation.residence,
      job: job || userInformation.job,
      worryCategories: categories || userInformation.worryCategories,
    });
  };

  const buttonEnabled =
    isNicknameAgeGenderValid && isRegionJobCategoryValid && hasEdited();

  const handleNicknameAgeGenderValidate = (isValid: boolean) => {
    setIsNicknameAgeGenderValid(isValid);
  };
  const handleRegionJobCategoryValidate = (isValid: boolean) => {
    setIsRegionJobCategoryValid(isValid);
  };

  const handleEditProfile = () => {
    console.log(userInformation.worryCategories);
    if (
      userInformation.sex &&
      userInformation.residence?.value &&
      userInformation.nickname &&
      userInformation.job &&
      userInformation.worryCategories
    ) {
      const worryCategories = userInformation.worryCategories.map(
        (v) => v.value
      );
      editProfile({
        nickname: userInformation.nickname,
        job: userInformation.job,
        worryCategories: worryCategories.length > 0 ? worryCategories : null,
        sex: userInformation.sex,
        residenceId: userInformation.residence?.value,
        userId: user.id,
        birthDate: userInformation.birthday,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess]);

  return (
    <div className="flex h-full flex-col">
      <TopAppBar title={'프로필 편집'} />
      <div className="hide-scrollbar mt-[2.5rem] flex-1 space-y-[2.9rem] overflow-y-scroll px-[2.5rem]">
        <CollectNicknameAgeGender
          onChange={handleNicknameAgeGenderChange}
          onValidate={handleNicknameAgeGenderValidate}
        />
        <CollectRegionJobCategory
          onChange={handleRegionJobCategoryChange}
          onValidate={handleRegionJobCategoryValidate}
        />
      </div>
      <DockedButton
        disabled={!buttonEnabled}
        className="absolute bottom-0"
        backgroundClassName="w-full"
        onClick={handleEditProfile}
      >
        변경 완료
      </DockedButton>
    </div>
  );
}

export default withAuth(EditProfilePage, { block: 'unauthenticated' });
