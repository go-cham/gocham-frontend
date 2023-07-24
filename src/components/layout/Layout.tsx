import BackgroundText from '@/images//backgroundText.svg';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-full w-screen overflow-hidden bg-without-character bg-cover bg-center">
      <img
        src={BackgroundText}
        alt="백그라운드 텍스트"
        className="fixed left-[10rem] top-[10rem] hidden h-[39.3rem] w-[43.5rem] xl:block"
      />
      <div className="relative mx-auto h-full w-full max-w-[43rem] bg-background-mainBg-0 xl:left-[25rem]">
        {children}
      </div>
    </div>
  );
}
