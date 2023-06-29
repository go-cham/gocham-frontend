interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-without-character bg-cover bg-center xl:bg-with-character">
      <div className="relative mx-auto h-full w-full max-w-[43rem] bg-background xl:left-[25rem]">
        {children}
      </div>
    </div>
  );
}
