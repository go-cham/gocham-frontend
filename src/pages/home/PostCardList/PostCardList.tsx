import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/ui/skeleton/PostCardSkeleton';
import { UserType } from '@/constants/user-type';
import usePullToRefresh from '@/hooks/usePullToRefresh';
import BannerLight from '@/images/banner-light.png';
import BannerDark from '@/images/banner-dark.png';
import { isMobile } from 'react-device-detect';

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
  const ptfRef = usePullToRefresh<HTMLDivElement>({
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
      <ul className="flex w-full flex-col items-center space-y-[1.7rem] px-[2.5rem] pt-[8.5rem]">
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
    <div
      ref={ptfRef}
      className={'hide-scrollbar overflow-scroll overscroll-y-none'}
    >
      <a
        href={
          isMobile
            ? 'https://sharechang.notion.site/GoCham-5d4be861d6ad46ca89849315c7a6be2c?pvs=4'
            : 'https://sharechang.notion.site/GoCham-0bc7fb112eb74df7af8484ef0bda85ca?pvs=4'
        }
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={isMobile ? BannerDark : BannerLight}
          alt="배너"
          className="w-full pt-[10.3rem]"
        />
      </a>
      <ul className="flex w-full flex-col items-center space-y-[1.7rem] px-[2.5rem] pb-[12rem] pt-[2.1rem]">
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
    </div>
  );
}
