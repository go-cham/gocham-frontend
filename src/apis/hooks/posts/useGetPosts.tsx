import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { GetPostsResponse } from '@/apis/dto/posts/get-posts';
import { axiosInstance } from '@/libs/axios';
import { Post } from '@/types/post';

export default function useGetPosts({
  authorId,
  participatingUserId,
  initialPostId,
}: {
  authorId?: number | null;
  participatingUserId?: number | null;
  initialPostId?: number;
} = {}) {
  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts', initialPostId, authorId, participatingUserId],
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get<GetPostsResponse>('/worries', {
        params: {
          sort: 'DESC',
          take: 5,
          nextCursorId: pageParam || initialPostId,
          authorId,
          participatingUserId,
        },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.meta.nextId || undefined,
  });

  const { ref, inView } = useInView({
    rootMargin: '100px 0px 0px 0px',
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const posts: Post[] | null =
    data?.pages
      .map((page) => page.data)
      .flat()
      .map((post) => ({
        id: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        title: post.title,
        content: post.content,
        expirationTime: post.expirationTime,
        worryFiles: post.worryFiles,
        user: post.user,
        replyCount: post.replyCount,
        userWorryChoiceCount: post.userWorryChoiceCount,
      })) || null;

  return {
    posts,
    totalCount: data?.pages[0].meta.total || 0,
    ref,
    isLoading,
    error,
  };
}
