import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useEditProfile from '@/apis/hooks/users/useEditProfile';
import useUser from '@/apis/hooks/users/useUser';
import BackIcon from '@/components/icons/BackIcon';
import CollectNicknameAgeGender from '@/components/user/CollectNicknameAgeGender/CollectNicknameAgeGender';
import CollectRegionJobCategory from '@/components/user/CollectRegionJobCategory/CollectRegionJobCategory';
import withAuth from '@/components/withAuth';
import { RouteURL } from '@/constants/route-url';
import { Gender } from '@/types/user';

interface RegisterData {
  nickname: string;
  birthday: string;
  gender: Gender | null;
  residenceId: number | null;
  job: string;
  categoryIds: number[];
}

function CollectInformationPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [registerData, setRegisterData] = useState<RegisterData>({
    nickname: '',
    birthday: '',
    gender: null,
    residenceId: null,
    job: '',
    categoryIds: [],
  });
  const { editProfile, isSuccess } = useEditProfile();

  const handleSubmit = () => {
    const { job, categoryIds, gender, residenceId, nickname, birthday } =
      registerData;
    if (user && gender && residenceId) {
      editProfile({
        userId: user.id,
        job,
        residenceId,
        nickname,
        sex: gender,
        birthDate: birthday,
        worryCategories: categoryIds,
      });
    }
  };

  const handleGoBack = () => {
    if (page === 1) {
      navigate(RouteURL.register_term);
    } else if (page === 2) {
      setPage(1);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

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
                birthday: registerData.birthday,
                gender: registerData.gender,
              }}
              onNext={(nickname, birthday, gender) => {
                setRegisterData({
                  ...registerData,
                  nickname,
                  birthday,
                  gender,
                });
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
