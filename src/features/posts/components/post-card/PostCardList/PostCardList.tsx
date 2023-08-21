import { POST_TYPE } from '@/common/constants/post-type';
import { NoPost } from '@/features/posts/components/NoPost';
import { PostCard } from '@/features/posts/components/post-card/PostCard';
import { useGetPosts } from '@/features/posts/queries';
import { useUser } from '@/features/user/queries/useUser';

interface PostCardListProps {
  type: POST_TYPE;
}

export function PostCardList({ type }: PostCardListProps) {
  const { user } = useUser();
  const { posts, ref } = useGetPosts({
    userId: user?.id,
    type,
  });

  if (type !== POST_TYPE.ALL && posts?.length === 0) {
    return <NoPost type={type} />;
  }

  return (
    <ul className={'flex w-full flex-col items-center space-y-[1.7rem]'}>
      {posts?.map((post, index) => (
        <li
          key={post.id}
          ref={index === posts.length - 1 ? ref : undefined}
          className="w-full"
        >
          <PostCard post={post} type={type} />
        </li>
      ))}
    </ul>
  );
}
