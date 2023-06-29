import BottomAppBar from '@/components/layout/BottomAppBar';
import HomeHeader from '@/pages/home/HomeHeader';
import PostCardList from '@/pages/home/PostCardList';

export default function HomePage() {
  return (
    <div className="flex h-full flex-col">
      <HomeHeader />
      <main className="flex-1 overflow-y-scroll pb-40 pt-[2.1rem]">
        <PostCardList />
      </main>
      <BottomAppBar />
    </div>
  );
}
