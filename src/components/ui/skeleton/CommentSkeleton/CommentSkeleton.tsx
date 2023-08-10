import { twMerge } from 'tailwind-merge';

interface CommentSkeletonProps {
  className?: string;
}

export default function CommentSkeleton({ className }: CommentSkeletonProps) {
  return (
    <div
      className={twMerge(
        'w-full border-b border-background-subBg-100 bg-white px-[1.5rem] pb-[1.5rem] pt-[1.9rem]',
        className,
      )}
    >
      <div className="flex items-center space-x-[0.5rem]">
        <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-background-subBg-100" />
        <div className="h-[1.8rem] w-[11rem] rounded-[3px] bg-background-subBg-100" />
      </div>
      <div className="ml-[3rem] mt-[0.7rem] space-y-[0.7rem]">
        <div className="h-[2.1rem] w-full rounded-[3px] bg-background-subBg-100" />
        <div className="h-[2.1rem] w-[70%] rounded-[3px] bg-background-subBg-100" />
      </div>
    </div>
  );
}
