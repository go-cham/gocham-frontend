import BottomAppBar from '@/components/layout/BottomAppBar';
import useScrollRestoration from '@/hooks/useScrollRestoration';
import useScrollToTop from '@/hooks/useScrollToTop';
// import HomeHeader from '@/pages/home/HomeHeader';
import PostCardList from '@/pages/home/PostCardList';

export default function HomePage() {
  const { ref, scrollToTop } = useScrollToTop<HTMLDivElement>();
  const scrollRef = useScrollRestoration<HTMLDivElement>('home');

  return (
    <div
      ref={(el) => {
        ref.current = el;
        scrollRef.current = el;
      }}
      className="flex h-full flex-col"
    >
      {/*<HomeHeader onClickLogo={scrollToTop} />*/}
      <PostCardList />
      <BottomAppBar currentPage="home" onScrollToTop={scrollToTop} />
    </div>
  );
}
