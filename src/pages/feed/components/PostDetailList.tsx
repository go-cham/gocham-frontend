import { useParams } from 'react-router-dom';

import useUser from '@/apis/hooks/users/useUser';
import { POST_TYPE } from '@/constants/post-type';
import useGetPosts from '@/hooks/useGetPosts';
import useScrollRestoration from '@/hooks/useScrollRestoration';
import PostDetail from '@/pages/feed/components/PostDetail';

interface PostDetailListProps {
  type: POST_TYPE;
}

export default function PostDetailList({ type }: PostDetailListProps) {
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
      className="hide-scrollbar flex-1 overflow-y-scroll pt-[0.9rem]"
      style={{ scrollSnapType: 'y proximity', scrollSnapAlign: 'start' }}
      ref={scrollRef}
    >
      {posts.map((post, index) => (
        <li key={post.id} ref={index === posts.length - 1 ? ref : undefined}>
          <PostDetail post={post} />
        </li>
      ))}
    </ul>
  );
}
