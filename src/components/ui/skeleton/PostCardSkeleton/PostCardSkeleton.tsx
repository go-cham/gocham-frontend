import { twMerge } from 'tailwind-merge';

interface PostCardSkeletonProps {
  hasProfile?: boolean;
  className?: string;
}

export default function PostCardSkeleton({
  hasProfile = true,
  className,
}: PostCardSkeletonProps) {
  return (
    <div
      className={twMerge(
        'w-full rounded-[7px] border border-background-subBg-100 bg-white px-[1.7rem] py-[1.3rem]',
        className
      )}
    >
      {hasProfile && (
        <div className="flex items-center space-x-[0.5rem]">
          <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-background-subBg-100" />
          <div className="h-[1.8rem] w-[11rem] rounded-[3px] bg-background-subBg-100" />
        </div>
      )}
      <div className="mt-[0.3rem] flex w-full items-center justify-between space-x-[1.7rem]">
        <div className="flex-1 space-y-[0.7rem]">
          <div className="h-[2.4rem] w-full rounded-[3px] bg-background-subBg-100" />
          <div className="h-[1.8rem] w-full rounded-[3px] bg-background-subBg-100" />
        </div>
        <div className="h-[6.4rem] w-[6.4rem] rounded-[5px] bg-background-subBg-100" />
      </div>
      <div className="mt-[0.5rem] h-[1.3rem] w-[11rem] rounded-[3px] bg-background-subBg-100" />
    </div>
  );
}
