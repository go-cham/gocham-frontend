export default function PostDetailSkeleton() {
  return (
    <div className="w-full bg-white px-[2.5rem] pb-[1.9rem] pt-[2.1rem]">
      <div className="flex items-center space-x-[0.5rem]">
        <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-background-subBg-100" />
        <div className="h-[1.8rem] w-[11rem] rounded-[3px] bg-background-subBg-100" />
      </div>
      <div className="mt-[1.7rem] space-y-[1.1rem]">
        <div className="h-[2.7rem] w-full rounded-[3px] bg-background-subBg-100" />
        <div className="h-[2.1rem] w-[70%] rounded-[3px] bg-background-subBg-100" />
      </div>
      <div className="mt-[2.3rem] space-y-[1.1rem]">
        <div className="h-[4.5rem] w-full rounded-[3px] bg-background-subBg-100" />
        <div className="h-[4.5rem] w-full rounded-[3px] bg-background-subBg-100" />
      </div>
    </div>
  );
}
