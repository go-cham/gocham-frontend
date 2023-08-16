import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackIcon from '@/common/components/icons/BackIcon';
import { withAuth } from '@/features/auth/components/withAuth/withAuth';
import { useAcceptTerms } from '@/features/auth/queries';
import { registerDataAtom } from '@/features/register/states/register-data';
import CollectNicknameAgeGender from '@/features/user/components/CollectNicknameAgeGender/CollectNicknameAgeGender';
import CollectRegionJobCategory from '@/features/user/components/CollectRegionJobCategory/CollectRegionJobCategory';
import { useEditProfile } from '@/features/user/queries/useEditProfile';
import { useUser } from '@/features/user/queries/useUser';

function CollectInformationPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [registerData, setRegisterData] = useAtom(registerDataAtom);
  const { user } = useUser();
  const { mutate: acceptTerms } = useAcceptTerms();
  const { mutate: editProfile, isSuccess } = useEditProfile();

  const handleSubmit = async () => {
    const {
      job,
      categoryIds,
      gender,
      residenceId,
      nickname,
      birthDate,
      accept,
    } = registerData;

    if (!user || !residenceId || !gender) return;

    await acceptTerms({
      userId: user.id,
      termsOfUseAcceptedStatus: Number(accept.gochamTerm),
      privacyAcceptedStatus: Number(accept.personalInformation),
    });
    await editProfile({
      userId: user.id,
      job: job.trim(),
      residenceId,
      nickname,
      sex: gender,
      birthDate: birthDate,
      worryCategories: categoryIds,
    });
  };

  const handleGoBack = () => {
    if (page === 1) {
      navigate('/register/term');
    } else if (page === 2) {
      setPage(1);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (!registerData.accept.gochamTerm) {
      navigate('/register/term');
    }
  }, [navigate, registerData.accept.gochamTerm]);

  return (
    <div className="relative flex h-full flex-col bg-white">
      <BackIcon
        onClick={handleGoBack}
        className="ml-[0.9rem] cursor-pointer"
        color="#424242"
      />
      <div className="mt-[3.3rem] flex flex-col px-[2.6rem]">
        <h1 className="font-custom-hero">
          수많은 고민들이 👀
          <br />
          당신을 기다리고 있어요 !
        </h1>
        <section className="mt-[2.9rem]">
          {page === 1 && (
            <CollectNicknameAgeGender
              initialData={{
                nickname: registerData.nickname,
                birthDate: registerData.birthDate,
                gender: registerData.gender,
              }}
              onChange={(nickname, birthDate, gender) => {
                setRegisterData({
                  ...registerData,
                  nickname,
                  birthDate,
                  gender,
                });
              }}
              onNext={() => {
                setPage(2);
              }}
            />
          )}
          {page === 2 && (
            <CollectRegionJobCategory
              initialData={{
                categoryIds: registerData.categoryIds,
                job: registerData.job,
                residenceId: registerData.residenceId,
              }}
              onChange={(data) => {
                setRegisterData({
                  ...registerData,
                  residenceId: data.residenceId,
                  job: data.job,
                  categoryIds: data.categoryIds,
                });
              }}
              onSubmit={handleSubmit}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default withAuth(CollectInformationPage, { block: 'activated' });
