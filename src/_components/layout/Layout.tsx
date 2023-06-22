export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-without-character bg-cover bg-center xl:bg-with-character">
      <div className="relative mx-auto h-full w-[43rem] bg-background xl:left-[25rem]">
        {children}
      </div>
    </div>
  );
}
