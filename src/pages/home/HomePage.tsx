import BottomAppBar from '@/components/layout/BottomAppBar';
import useScrollToTop from '@/hooks/useScrollToTop';
import HomeHeader from '@/pages/home/HomeHeader';
import PostCardList from '@/pages/home/PostCardList';

export default function HomePage() {
  const { ref, scrollToTop } = useScrollToTop<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="hide-scrollbar flex h-full flex-col overflow-y-scroll bg-white"
    >
      <HomeHeader onClickLogo={scrollToTop} />
      <main className="flex-1 px-[2.5rem] pb-40 pt-[0.8rem]">
        <PostCardList />
      </main>
      <BottomAppBar onScrollToTop={scrollToTop} />
    </div>
  );
}
