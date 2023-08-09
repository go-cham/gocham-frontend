import { useNavigate } from 'react-router-dom';

import useUser from '@/apis/hooks/users/useUser';
import { RouteURL } from '@/constants/route-url';
import { calculateAge } from '@/utils/date/calculateAge';
import { ADMIN_EMAIL } from '@/constants/admin';

export default function UserProfile() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGoEditProfile = () => {
    navigate(RouteURL.edit_profile);
  };

  if (!user || !user.birthday) {
    return null;
  }

  const birthday = new Date(user.birthday);
  const age = calculateAge(
    birthday.getFullYear(),
    birthday.getMonth() + 1,
    birthday.getDate(),
  );

  const isAdmin = user.email === ADMIN_EMAIL;

  return (
    <div className="mt-[1.7rem] flex items-center justify-between px-[2.5rem]">
      <div className="flex items-center space-x-[0.8rem]">
        {isAdmin && user.image ? (
          <img
            src={user.image}
            alt="관리자 계정 이미지"
            className="h-[3.6rem] w-[3.6rem] rounded-full"
          />
        ) : (
          <span className="flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-full bg-[#f4f4f5] text-[#b0b2b8] font-system-heading2">
            {String(age).slice(0, -1) + '0'}
          </span>
        )}
        <span className="text-[#2a2d37] font-custom-heading1">
          {user.nickname}
        </span>
      </div>
      <button
        className="rounded-[0.5rem] bg-background-voteBg-100 px-[1rem] py-[0.7rem] text-text-subTitle-700 font-system-body2"
        onClick={handleGoEditProfile}
      >
        프로필 편집
      </button>
    </div>
  );
}
