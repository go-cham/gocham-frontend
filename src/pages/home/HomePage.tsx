import BottomAppBar from '@/components/layout/BottomAppBar';
import HomeHeader from '@/pages/home/HomeHeader';
import PostCardList from '@/pages/home/PostCardList';

export default function HomePage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <HomeHeader />
      <main className="hide-scrollbar flex-1 overflow-y-scroll px-[2.5rem] pb-40 pt-[0.8rem]">
        <PostCardList />
      </main>
      <BottomAppBar />
    </div>
  );
}
