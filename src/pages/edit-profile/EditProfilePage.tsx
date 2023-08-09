import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useEditProfile from '@/apis/hooks/users/useEditProfile';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import DockedButton from '@/components/ui/buttons/DockedButton';
import NicknameAgeGenderForm from '@/components/user/NicknameAgeGenderForm';
import RegionJobCategoryForm from '@/components/user/RegionJobCategoryForm';
import withAuth from '@/components/withAuth';
import { Gender } from '@/types/user';

interface FormData {
  nickname: string;
  birthday: string;
  gender: Gender | null;
  residenceId: number | null;
  job: string;
  categoryIds: number[];
}

function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { editProfile, isSuccess } = useEditProfile();
  const [isValid, setIsValid] = useState({
    nicknameAgeGender: true,
    regionJobCategory: true,
  });
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    birthday: '',
    gender: null,
    residenceId: null,
    job: '',
    categoryIds: [],
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess]);

  if (!user) {
    return null;
  }

  const hasEdited = () => {
    return (
      formData.nickname !== user.nickname ||
      (user.birthday && formData.birthday !== user.birthday) ||
      formData.gender !== user.sex ||
      formData.residenceId !== user.residence?.value ||
      formData.job !== user.job ||
      formData.categoryIds?.slice().sort().join(',') !==
        user.worryCategories
          ?.map((cat) => cat.value)
          .sort()
          .join(',')
    );
  };

  const handleEditProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.gender &&
      formData.residenceId &&
      formData.nickname &&
      formData.job &&
      formData.categoryIds
    ) {
      editProfile({
        userId: user.id,
        nickname: formData.nickname,
        job: formData.job.trim(),
        worryCategories:
          formData.categoryIds.length > 0 ? formData.categoryIds : [],
        sex: formData.gender,
        residenceId: formData.residenceId,
        birthDate: formData.birthday,
      });
    }
  };

  const buttonEnabled =
    isValid.nicknameAgeGender && isValid.regionJobCategory && hasEdited();

  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname,
        gender: user.sex,
        birthday: user.birthday || '',
        job: user.job,
        categoryIds: user.worryCategories?.map((cat) => cat.value) || [],
        residenceId: user.residence?.value || null,
      });
    }
  }, []);

  return (
    <div className="flex h-full flex-col">
      <TopAppBar title={'프로필 편집'} />
      <form
        className="mt-[2.5rem] flex min-h-0 w-full flex-1 flex-col space-y-[2.9rem]"
        onSubmit={handleEditProfile}
      >
        <div className="hide-scrollbar flex-1 space-y-[2.9rem] overflow-y-scroll px-[2.5rem]">
          <NicknameAgeGenderForm
            initialData={{
              nickname: user.nickname,
              gender: user.sex,
              birthday: user.birthday || '',
            }}
            onChange={({ nickname, gender, birthday }, isValid) => {
              setFormData({
                ...formData,
                nickname,
                gender,
                birthday,
              });
              setIsValid((prevIsValid) => ({
                ...prevIsValid,
                nicknameAgeGender: isValid,
              }));
            }}
          />
          <RegionJobCategoryForm
            initialData={{
              categoryIds: user.worryCategories?.map((cat) => cat.value) || [],
              job: user.job,
              residenceId: user.residence?.value || null,
            }}
            onChange={({ job, categoryIds, residenceId }, isValid) => {
              setFormData({
                ...formData,
                job,
                categoryIds,
                residenceId,
              });
              setIsValid((prevIsValid) => ({
                ...prevIsValid,
                regionJobCategory: isValid,
              }));
            }}
          />
        </div>
        <DockedButton disabled={!buttonEnabled} backgroundClassName="w-full">
          변경 완료
        </DockedButton>
      </form>
    </div>
  );
}

export default withAuth(EditProfilePage, { block: 'unauthenticated' });
