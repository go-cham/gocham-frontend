import { useNavigate } from 'react-router-dom';

import useUser from '@/apis/hooks/users/useUser';
import UserProfile from '@/components/user/UserProfile';
import { ADMIN_EMAIL } from '@/constants/admin';
import settingIcon from '@/images/Profile/settings.svg';
import { calculateAgeFromBirthDate } from '@/utils/date/calculateAge';

export default function UserPageHeader() {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <header className={'px-[2.5rem]'}>
      <div className="mt-[1.2rem] flex items-center justify-end">
        <button onClick={() => navigate('/settings')}>
          <img
            src={settingIcon}
            alt={'설정'}
            className={'h-[3.2rem] w-[3.2rem]'}
          />
        </button>
      </div>
      <div className="mt-[1.7rem] flex items-center justify-between">
        <UserProfile
          nickname={user.nickname}
          age={calculateAgeFromBirthDate(user.birthDate)}
          isAdmin={user.email === ADMIN_EMAIL}
          size="large"
        />
        <button
          className="rounded-[0.5rem] bg-background-voteBg-100 px-[1rem] py-[0.7rem] text-text-subTitle-700 font-system-body2"
          onClick={() => navigate('/edit-profile')}
        >
          프로필 편집
        </button>
      </div>
    </header>
  );
}
