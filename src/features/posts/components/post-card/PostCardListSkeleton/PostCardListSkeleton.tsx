import PostCardSkeleton from '@/common/components/ui/skeleton/PostCardSkeleton';

export default function PostCardListSkeleton() {
  return (
    <ul className="flex w-full flex-col items-center space-y-[1.7rem]">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <li key={index} className="w-full">
            <PostCardSkeleton />
          </li>
        ))}
    </ul>
  );
}
