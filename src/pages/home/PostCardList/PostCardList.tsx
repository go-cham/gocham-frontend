import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/ui/skeleton/PostCardSkeleton';
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
  const { posts, ref, error } = useGetPosts({
    authorId,
    participatingUserId,
  });

  if (error) {
    // TODO: 에러 처리
    return null;
  }

  if (!posts) {
    // 로딩 중
    return (
      <ul className="flex w-full flex-col items-center space-y-[1.7rem]">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <li key={index} className="w-full">
              <PostCardSkeleton />
            </li>
          ))}
      </ul>
    );
  }

  return (
    <ul className="flex w-full flex-col items-center space-y-[1.7rem]">
      {posts.map((post, index) => (
        <li
          key={post.id}
          ref={index === posts.length - 1 ? ref : undefined}
          className="w-full"
        >
          <PostCard
            loggedIn={user?.type === userType.activatedUser}
            post={post}
          />
        </li>
      ))}
    </ul>
  );
}
