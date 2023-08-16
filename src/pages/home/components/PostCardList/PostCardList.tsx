import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import PostCard from '@/components/post/PostCard';
import { POST_TYPE } from '@/constants/post-type';

interface PostCardListProps {
  type: POST_TYPE;
}

export default function PostCardList({ type }: PostCardListProps) {
  const { user } = useUser();
  const { posts, ref } = useGetPosts({
    userId: user?.id,
    type,
  });

  return (
    <ul className={'flex w-full flex-col items-center space-y-[1.7rem]'}>
      {posts.map((post, index) => (
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
