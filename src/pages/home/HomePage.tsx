import BottomAppBar from '@/components/layout/BottomAppBar';
import HomeHeader from '@/pages/home/HomeHeader';
import PostCardList from '@/pages/home/PostCardList';

export default function HomePage() {
  return (
    <div className="hide-scrollbar flex h-full flex-col overflow-y-scroll bg-white">
      <HomeHeader />
      <main
        id="home-post-list"
        className="flex-1 px-[2.5rem] pb-40 pt-[0.8rem]"
      >
        <PostCardList />
      </main>
      <BottomAppBar />
    </div>
  );
}
