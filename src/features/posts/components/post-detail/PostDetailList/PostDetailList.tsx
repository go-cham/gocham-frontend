import { useParams } from 'react-router-dom';
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
    initialPostId,
    userId: user?.id,
    type,
  });
  const scrollRef = useScrollRestoration<HTMLUListElement>('feed');

  return (
    <ul
      className="hide-scrollbar flex-1 divide-y divide-background-dividerLine-300 overflow-y-scroll pt-[0.9rem]"
      style={{ scrollSnapType: 'y proximity', scrollSnapAlign: 'start' }}
      ref={scrollRef}
    >
      {posts?.map((post, index) => (
        <li key={post.id} ref={index === posts.length - 1 ? ref : undefined}>
          <PostDetailItem post={post} />
        </li>
      ))}
    </ul>
  );
}
