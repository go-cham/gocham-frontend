import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopAppBar } from '@/common/components/layout';
import { DockedButton } from '@/common/components/ui/buttons';
import { NicknameAgeGenderForm } from '@/features/user/components/NicknameAgeGenderForm';
import { RegionJobCategoryForm } from '@/features/user/components/RegionJobCategoryForm';
import { useEditProfile } from '@/features/user/queries/useEditProfile';
import { useUser } from '@/features/user/queries/useUser';
import { Gender } from '@/features/user/types';

interface FormData {
  nickname: string;
  birthDate: string;
  gender: Gender | null;
  residenceId: number | null;
  job: string;
  categoryIds: number[];
}

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { mutate: editProfile, isSuccess } = useEditProfile();
  const [isValid, setIsValid] = useState({
    nicknameAgeGender: true,
    regionJobCategory: true,
  });
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    birthDate: '',
    gender: null,
    residenceId: null,
    job: '',
    categoryIds: [],
  });

  const hasEdited = () => {
    if (!user) {
      return false;
    }
    return (
      formData.nickname !== user.nickname ||
      (user.birthDate && formData.birthDate !== user.birthDate) ||
      formData.gender !== user.gender ||
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
      user &&
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
        gender: formData.gender,
        residenceId: formData.residenceId,
        birthDate: formData.birthDate,
      });
    }
  };

  const buttonEnabled =
    isValid.nicknameAgeGender && isValid.regionJobCategory && hasEdited();

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname,
        gender: user.gender,
        birthDate: user.birthDate || '',
        job: user.job,
        categoryIds: user.worryCategories?.map((cat) => cat.value) || [],
        residenceId: user.residence?.value || null,
      });
    }
  }, [user]);

  if (!user) {
    return null;
  }

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
              gender: user.gender,
              birthDate: user.birthDate || '',
            }}
            onChange={({ nickname, gender, birthDate }, isValid) => {
              setFormData({
                ...formData,
                nickname,
                gender,
                birthDate,
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
