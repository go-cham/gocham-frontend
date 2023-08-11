import { twJoin } from 'tailwind-merge';

import adminProfile from '@/images/admin.png';

const MAX_AGE_RANGE = 40;

interface UserProfileProps {
  nickname: string;
  age: number;
  isAdmin: boolean;
  size?: 'base' | 'large';
}

export default function UserProfile({
  nickname,
  age,
  isAdmin,
  size = 'base',
}: UserProfileProps) {
  const ageRange = Math.floor(age / 10) * 10;
  const isOverMaxRange = ageRange > MAX_AGE_RANGE;

  return (
    <div
      className={twJoin(
        'flex items-center',
        size === 'base' ? 'space-x-[0.5rem]' : 'space-x-[0.8rem]',
      )}
    >
      {isAdmin ? (
        <img
          src={adminProfile}
          alt="관리자 로고"
          className={twJoin(
            'rounded-full',
            size === 'base' ? 'h-[2.5rem] w-[2.5rem]' : 'h-[3.6rem] w-[3.6rem]',
          )}
        />
      ) : (
        <span
          className={twJoin(
            'flex items-center justify-center rounded-full bg-[#f4f4f5] font-bold text-[#b0b2b8]',
            size === 'base'
              ? `h-[2.5rem] w-[2.5rem] font-system-body1 ${
                  isOverMaxRange && 'text-[1.1rem]'
                }`
              : 'h-[3.6rem] w-[3.6rem] font-system-heading2',
          )}
          style={{ fontWeight: 'bold' }}
        >
          {isOverMaxRange ? `${MAX_AGE_RANGE}+` : ageRange}
        </span>
      )}
      <span
        className={twJoin(
          size === 'base'
            ? 'font-system-body2'
            : 'text-[#2a2d37] font-custom-heading1',
        )}
      >
        {nickname}
      </span>
    </div>
  );
}
