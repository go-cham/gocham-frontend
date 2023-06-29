import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import PostCard from '@/components/post/PostCard';
import { userType } from '@/constants/userTypeEnum';

interface PostCardListProps {
  authorId?: number;
  participatingUserId?: number;
}

export default function PostCardList({
  authorId,
  participatingUserId,
}: PostCardListProps) {
  const { user } = useUser();
  const { posts, ref } = useGetPosts({
    authorId,
    participatingUserId,
  });

  if (!posts) {
    return null;
  }

  return (
    <ul className="flex flex-col items-center space-y-[1.7rem]">
      {posts.map((post, index) => (
        <li key={post.id} ref={index === posts.length - 1 ? ref : undefined}>
          <PostCard
            loggedIn={user?.type === userType.activatedUser}
            post={post}
          />
        </li>
      ))}
    </ul>
  );
}
