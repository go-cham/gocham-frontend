import PostDetailSkeleton from '@/common/components/ui/skeleton/PostDetailSkeleton';

export function PostDetailListSkeleton() {
  return (
    <ul
      className="hide-scrollbar flex-1 overflow-y-scroll pt-[0.9rem]"
      style={{ scrollSnapType: 'y proximity', scrollSnapAlign: 'start' }}
    >
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <PostDetailSkeleton key={i} />
        ))}
    </ul>
  );
}
