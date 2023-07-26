import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import LogoFull from '@/images/Common/HomeLogoFull.svg';
import LogoStarve from '@/images/Common/HomeLogoStarve.svg';

interface HomeHeaderProps {
  onClickLogo: () => void;
}

export default function HomeHeader({ onClickLogo }: HomeHeaderProps) {
  const { user } = useUser();
  const { posts } = useGetPosts({
    authorId: user?.id,
  });

  let uploadedIn24 = false;
  if (user?.id && posts && posts.length > 0) {
    const latestUploadedAt = new Date(posts[0].createdAt);
    const now = new Date();

    if (now.getTime() - latestUploadedAt.getTime() < 24 * 3600 * 1000) {
      uploadedIn24 = true;
    }
  }

  return (
    <header
      className="sticky top-0 z-30 flex w-full items-center py-[1.2rem] pl-[2.5rem]"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      {!uploadedIn24 ? (
        <>
          <img
            src={LogoStarve}
            alt={'배고픈로고'}
            onClick={onClickLogo}
            className="cursor-pointer"
          />
          <div
            className="ml-[1.5rem] rounded-lg pb-[0.7rem] pl-[1.1rem] pr-[1.7rem] pt-[0.6rem] shadow-dropdown font-custom-subheading"
            style={{
              fontWeight: 400,
            }}
          >
            고민을 작성해서 고민이에게 힘을 주세요!
          </div>
        </>
      ) : (
        <>
          <img
            src={LogoFull}
            alt={'배부른로고'}
            onClick={onClickLogo}
            className="cursor-pointer"
          />
          <div
            className="ml-[1.5rem] rounded-lg pb-[0.7rem] pl-[1.1rem] pr-[1.7rem] pt-[0.6rem] shadow-dropdown font-custom-subheading"
            style={{
              fontWeight: 400,
            }}
          >
            오늘도 고민 충전 완료!
          </div>
        </>
      )}
    </header>
  );
}
