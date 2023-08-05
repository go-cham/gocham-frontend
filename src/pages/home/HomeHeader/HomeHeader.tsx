import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';

import Logo from './Logo';

const ONE_DAY_IN_MILLISECOND = 24 * 3600 * 1000;

interface HomeHeaderProps {
  onClickLogo: () => void;
}

export default function HomeHeader({ onClickLogo }: HomeHeaderProps) {
  const { user } = useUser();
  const { posts } = useGetPosts({
    authorId: user?.id,
  });

  const uploadedIn24 = checkUploadedIn24();
  const message = uploadedIn24
    ? '오늘도 고민 충전 완료!'
    : '고민을 작성해서 고민이에게 힘을 주세요!';

  function checkUploadedIn24() {
    if (!user || !posts || posts.length === 0) {
      return false;
    }
    const latestUploadedAt = new Date(posts[0].createdAt).getTime();
    const now = new Date().getTime();
    return now - latestUploadedAt < ONE_DAY_IN_MILLISECOND;
  }

  return (
    <header className="header-blur absolute top-0 z-30 flex w-full items-center space-x-[1.121rem] pb-[1.1rem] pl-[2.2rem] pt-[0.3rem]">
      <button onClick={onClickLogo}>
        <Logo colored={uploadedIn24} />
      </button>
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
