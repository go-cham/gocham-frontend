import { twJoin } from 'tailwind-merge';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import { ONE_DAY_IN_MILLISECOND } from '@/constants/time';
import { Z_INDEX } from '@/constants/z-index';

import HeaderLogo from './HeaderLogo';

interface HomeHeaderProps {
  onClickLogo: () => void;
}

export default function HomeHeader({ onClickLogo }: HomeHeaderProps) {
  const { user, isLoading: userLoading } = useUser();
  const userId = user?.id;
  const { posts, isLoading: postsLoading } = useGetPosts({
    authorId: userId,
    enabled: !!userId,
  });

  const isLoading = userLoading || postsLoading;

  const hasUploadedIn24 = () => {
    if (!user || !posts || posts.length === 0) {
      return false;
    }
    const latestUploadedAt = new Date(posts[0].createdAt).getTime();
    const now = new Date().getTime();
    return now - latestUploadedAt < ONE_DAY_IN_MILLISECOND;
  };

  const uploadedIn24 = hasUploadedIn24();
  const message = uploadedIn24
    ? '오늘도 고민 충전 완료!'
    : '고민을 작성해서 고민이에게 힘을 주세요!';

  return (
    <header
      className={twJoin(
        'header-blur absolute top-0 flex w-full items-center space-x-[1.121rem] pb-[1.1rem] pl-[2.2rem] pt-[2.1rem]',
        isLoading && 'invisible',
      )}
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
