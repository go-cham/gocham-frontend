import { Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PostDetailSkeleton from '@/common/components/ui/skeleton/PostDetailSkeleton';
import { POST_TYPE } from '@/common/constants/post-type';
import { useScrollRestoration } from '@/common/hooks/useScrollRestoration';
import { PostDetailItem } from '@/features/posts/components/post-detail';
import { useGetPosts } from '@/features/posts/queries';
import { useUser } from '@/features/user/queries/useUser';

interface PostDetailListProps {
  type: POST_TYPE;
}

export function PostDetailList({ type }: PostDetailListProps) {
  const { user } = useUser();
  const params = useParams();
  const initialPostId = params.id ? Number(params.id) : undefined;
  const { posts, ref } = useGetPosts({
    userId: user?.id,
    type,
  });
  const scrollRef = useScrollRestoration<HTMLUListElement>('feed');

  const firstIndex = posts?.findIndex((post) => post.id === initialPostId);
  const postsFiltered = posts?.slice(firstIndex === -1 ? 0 : firstIndex);

  if (type === POST_TYPE.MY && posts?.length === 0) {
    return <Navigate to={'/user'} />;
  }

  return (
    <ul
      className="hide-scrollbar flex-1 divide-y divide-background-dividerLine-300 overflow-y-scroll pt-[0.9rem]"
      style={{ scrollSnapType: 'y proximity', scrollSnapAlign: 'start' }}
      ref={scrollRef}
    >
      {postsFiltered?.map((post, index) => (
        <li
          key={post.id}
          ref={index === postsFiltered.length - 1 ? ref : undefined}
        >
          <Suspense fallback={<PostDetailSkeleton />}>
            <PostDetailItem post={post} />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}
