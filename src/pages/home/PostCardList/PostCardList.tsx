import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/ui/skeleton/PostCardSkeleton';
import { UserType } from '@/constants/user-type';

export default function PostCardList() {
  const { user } = useUser();
  const {
    posts,
    ref: postsRef,
    error,
    isFetching,
  } = useGetPosts({
    enabled: true,
  });

  if (!posts || error) {
    return null;
  }

  if (isFetching) {
    return (
      <ul className="flex w-full flex-col items-center space-y-[1.7rem] px-[2.5rem]">
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
    <ul className="flex w-full flex-col items-center space-y-[1.7rem] px-[2.5rem]">
      {posts.map((post, index) => (
        <li
          key={post.id}
          ref={index === posts.length - 1 ? postsRef : undefined}
          className="w-full"
        >
          <PostCard
            loggedIn={user?.type === UserType.activatedUser}
            post={post}
          />
        </li>
      ))}
    </ul>
  );
}
