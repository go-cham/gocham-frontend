import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import PostCard from '@/components/post/PostCard';

interface PostCardListProps {
  type: 'all' | 'my' | 'participated';
}

export default function PostCardList({ type }: PostCardListProps) {
  const { user } = useUser();
  const { posts, ref: postsRef } = useGetPosts({
    authorId: type === 'my' ? user?.id : null,
    participatingUserId: type === 'participated' ? user?.id : null,
  });

  return (
    <ul className={'flex w-full flex-col items-center space-y-[1.7rem]'}>
      {posts.map((post, index) => (
        <li
          key={post.id}
          ref={index === posts.length - 1 ? postsRef : undefined}
          className="w-full"
        >
          <PostCard post={post} type={type} />
        </li>
      ))}
    </ul>
  );
}
