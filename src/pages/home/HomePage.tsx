import BottomAppBar from '@/components/layout/BottomAppBar';
import HomeHeader from '@/pages/home/HomeHeader';
import PostCardList from '@/pages/home/PostCardList';

export default function HomePage() {
  const scrollToTop = () => {
    const list = document.getElementById('home-post-list');
    if (list) {
      list.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <HomeHeader onClickLogo={scrollToTop} />
      <PostCardList />
      <BottomAppBar currentPage="home" onScrollToTop={scrollToTop} />
    </div>
  );
}
