import { POST_TYPE } from '@/common/constants/post-type';
import { PostCard } from '@/features/posts/components/PostCard';
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
