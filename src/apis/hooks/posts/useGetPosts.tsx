import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { GetPostsResponse } from '@/apis/dto/posts/get-posts';
import { axiosInstance } from '@/libs/axios';

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

  const posts = data?.pages.map((page) => page.data).flat() || null;

  return {
    posts,
    ref,
    isLoading,
    error,
  };
}
