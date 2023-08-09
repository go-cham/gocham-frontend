import character from '@/images/background/character.svg';
import text from '@/images/background/text.svg';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-full w-screen overflow-hidden  bg-[#f5f5f5] bg-cover bg-center ">
      <img
        src={text}
        alt="text"
        className="fixed left-[5.5%] top-[8rem] z-10 hidden w-[40rem] xl:block"
      />
      <img
        src={character}
        alt="character"
        className="fixed bottom-0 left-0 hidden w-[45%] xl:block"
      />
      <div className="relative mx-auto h-full w-full max-w-[43rem] bg-background-mainBg-0  xl:left-[25rem]">
        {children}
      </div>
    </div>
  );
}
