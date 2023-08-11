import BottomAppBar from '@/components/layout/BottomAppBar';
import useScrollToTop from '@/hooks/useScrollToTop';
import HomeHeader from '@/pages/home/HomeHeader';
import PostCardList from '@/pages/home/PostCardList';

export default function HomePage() {
  const { ref, scrollToTop } = useScrollToTop<HTMLDivElement>();

  return (
    <div className="flex h-full flex-col">
      <HomeHeader onClickLogo={scrollToTop} />
      <PostCardList ref={ref} />
      <BottomAppBar currentPage="home" onScrollToTop={scrollToTop} />
    </div>
  );
}
