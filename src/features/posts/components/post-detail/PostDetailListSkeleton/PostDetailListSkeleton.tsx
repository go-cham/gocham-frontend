import PostDetailSkeleton from '@/common/components/ui/skeleton/PostDetailSkeleton';

export default function PostDetailListSkeleton() {
  return (
    <ul
      className="hide-scrollbar flex-1 divide-y divide-background-dividerLine-300 overflow-y-scroll pt-[0.9rem]"
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
