import { ONE_DAY_IN_MILLISECOND } from '@/common/constants/time';
import { Z_INDEX } from '@/common/constants/z-index';
import { useUser } from '@/features/user/queries';
import HeaderLogo from './HeaderLogo';

interface HomeHeaderProps {
  onClickLogo: () => void;
}

export default function HomeHeader({ onClickLogo }: HomeHeaderProps) {
  const { user, isLoggedIn } = useUser();

  const hasUploadedIn24 = () => {
    if (!isLoggedIn || !user?.lastUploadedAt) {
      return false;
    }
    const lastUploadedAt = new Date(
      user.lastUploadedAt.replace('Z', ''),
    ).getTime();
    const now = new Date().getTime();
    return now - lastUploadedAt < ONE_DAY_IN_MILLISECOND;
  };

  const uploadedIn24 = hasUploadedIn24();
  const message = uploadedIn24
    ? '오늘도 고민 충전 완료!'
    : '고민을 작성해서 고민이에게 힘을 주세요!';

  return (
    <header
      className={
        'header-blur absolute top-0 flex w-full items-center space-x-[1.121rem] pb-[1.1rem] pl-[2.2rem] pt-[2.1rem]'
      }
      style={{
        zIndex: Z_INDEX.mainHeader,
      }}
    >
      <HeaderLogo charged={uploadedIn24} onClick={onClickLogo} />
      <span
        className="rounded-[0.5rem] p-[0.6rem_1.7rem_0.7rem_1.1rem] shadow-dropdown font-custom-subheading"
        style={{
          fontWeight: 400,
        }}
      >
        {message}
      </span>
    </header>
  );
}
