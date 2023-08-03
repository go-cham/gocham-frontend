import { twMerge } from 'tailwind-merge';

interface PostSummarySkeletonProps {
  className?: string;
}

export default function PostSummarySkeleton({
  className,
}: PostSummarySkeletonProps) {
  return (
    <div
      className={twMerge(
        'w-full bg-white px-[2.5rem] pb-[2.3rem] pt-[2.1rem]',
        className
      )}
    >
      <div className="flex items-center space-x-[0.5rem]">
        <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-background-subBg-100" />
        <div className="h-[1.8rem] w-[11rem] rounded-[3px] bg-background-subBg-100" />
      </div>
      <div className="mt-[1.7rem]">
        <div className="h-[2.7rem] w-full rounded-[3px] bg-background-subBg-100" />
        <div className="mt-[1.1rem] h-[2.1rem] w-full rounded-[3px] bg-background-subBg-100" />
        <div className="mt-[0.5rem] h-[2.1rem] w-[70%] rounded-[3px] bg-background-subBg-100" />
      </div>
    </div>
  );
}
