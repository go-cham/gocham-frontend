import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/ui/skeleton/PostCardSkeleton';
import { UserType } from '@/constants/user-type';
import usePullToRefresh from '@/hooks/usePullToRefresh';

interface PostCardListProps {
  authorId?: number;
  participatingUserId?: number;
}

export default function PostCardList({
  authorId,
  participatingUserId,
}: PostCardListProps) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { posts, ref, error } = useGetPosts({
    authorId,
    participatingUserId,
  });
  const [isLoading, setIsLoading] = useState(false);
  const ptfRef = usePullToRefresh<HTMLUListElement>({
    onRefresh: () => {
      setIsLoading(true);
      queryClient
        .refetchQueries({
          queryKey: ['posts'],
        })
        .then(() => setIsLoading(false));
    },
    topOffset: 80,
  });

  if (error) {
    // TODO: 에러 처리
    return null;
  }

  if (isLoading || !posts) {
    // 로딩 중
    return (
      <ul
        ref={ptfRef}
        className="flex w-full flex-col items-center space-y-[1.7rem] px-[2.5rem] pt-[8.5rem]"
      >
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
    <ul
      ref={ptfRef}
      className="hide-scrollbar flex w-full flex-col items-center space-y-[1.7rem] overflow-y-scroll overscroll-y-none px-[2.5rem] pb-[12rem] pt-[10.3rem]"
    >
      {posts.map((post, index) => (
        <li
          key={post.id}
          ref={index === posts.length - 1 ? ref : undefined}
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
