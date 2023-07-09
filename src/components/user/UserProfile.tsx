import { useNavigate } from 'react-router-dom';

import useUser from '@/apis/hooks/users/useUser';
import { RouteURL } from '@/constants/route-url';
import { calculateAge } from '@/utils/date/calculateAge';

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
    birthday.getDay()
  );

  return (
    <div className="mt-[1.7rem] flex items-center justify-between px-[2.5rem]">
      <div className="flex items-center space-x-[0.8rem]">
        <span className="rounded-full bg-[#f4f4f5] p-[0.8rem] text-heading3 text-[#b0b2b8]">
          {String(age)[0] + '0'}
        </span>
        <span className="text-heading1">{user.nickname}</span>
      </div>
      <button
        className="rounded-[0.5rem] bg-custom-background-100 px-[1rem] py-[0.7rem] text-body2"
        onClick={handleGoEditProfile}
      >
        프로필 편집
      </button>
    </div>
  );
}
