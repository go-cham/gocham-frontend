export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-without-character bg-cover bg-center xl:bg-with-character">
      <div className="mx-auto w-[43rem] bg-background xl:relative xl:left-[25rem]">
        {children}
      </div>
    </div>
  );
}
