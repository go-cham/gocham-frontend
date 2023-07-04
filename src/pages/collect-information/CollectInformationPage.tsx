import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import useUser from '@/apis/hooks/users/useUser';
import BackIcon from '@/components/icons/BackIcon';
import CollectNicknameAgeGender from '@/components/user/CollectNicknameAgeGender/CollectNicknameAgeGender';
import CollectRegionJobCategory from '@/components/user/CollectRegionJobCategory/CollectRegionJobCategory';
import withAuth from '@/components/withAuth';
import { RouteURL } from '@/constants/route-url';
import { Gender } from '@/types/user';

interface RegisterData {
  nickname?: string;
  birthDay?: string;
  sex?: Gender;
  residenceId?: number;
  job?: string;
  worryCategories?: number[];
}

function CollectInformationPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [page, setPage] = useState(1);
  const [registerData, setRegisterData] = useState<RegisterData>();

  if (!user) {
    return <Navigate to={RouteURL.login} />;
  }

  const handleNicknameAgeGenderSubmit = (
    nickname: string,
    birthday: string,
    gender: Gender
  ) => {
    setRegisterData({
      ...registerData,
      nickname,
      birthDay: birthday,
      sex: gender,
    });
    setPage(2);
  };

  const handleRegionJobCategorySubmit = (
    residenceId: number,
    job: string,
    categoryIds: number[]
  ) => {
    setRegisterData({
      ...registerData,
      residenceId,
      job,
      worryCategories: categoryIds,
    });
  };

  const handleGoBack = () => {
    if (page === 2) {
      setPage(1);
    } else {
      navigate(RouteURL.register_term);
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-white">
      <BackIcon
        onClick={handleGoBack}
        className="ml-[0.9rem] cursor-pointer"
        color="#424242"
      />
      <div className="mt-[3.3rem] flex flex-col px-[2.6rem]">
        <h1 className="text-hero">
          수많은 고민들이 👀
          <br />
          당신을 기다리고 있어요 !
        </h1>
        <section className="mt-[2.9rem]">
          {page === 1 && (
            <CollectNicknameAgeGender
              onSubmit={handleNicknameAgeGenderSubmit}
            />
          )}
          {page === 2 && (
            <CollectRegionJobCategory
              onSubmit={handleRegionJobCategorySubmit}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default withAuth(CollectInformationPage, { block: 'activated' });
