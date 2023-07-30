import BottomAppBar from '@/components/layout/BottomAppBar';
import useScrollToTop from '@/hooks/useScrollToTop';
import HomeHeader from '@/pages/home/HomeHeader';
import PostCardList from '@/pages/home/PostCardList';

export default function HomePage() {
  const { ref, scrollToTop } = useScrollToTop<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="hide-scrollbar flex h-full flex-col overflow-y-scroll"
    >
      <HomeHeader onClickLogo={scrollToTop} />
      <main className="px-[2.5rem] pb-[10rem] pt-[0.8rem]">
        <PostCardList />
      </main>
      <BottomAppBar currentPage="home" onScrollToTop={scrollToTop} />
    </div>
  );
}
