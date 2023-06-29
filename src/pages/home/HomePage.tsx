import LogoAndTitle from '@/images/Common/LogoAndTitle.svg';

import PostCardList from './PostCardList';

export default function HomePage() {
  return (
    <div className="flex h-full flex-col">
      <header className="border border-gray3 bg-white py-[2rem] pl-[3rem] drop-shadow-[0_0_4px_rgba(42,45,55,0.1)]">
        <img src={LogoAndTitle} alt={'로고와타이틀'} />
      </header>
      <main className="flex-1 overflow-y-scroll">
        <PostCardList />
      </main>
    </div>
  );
}
