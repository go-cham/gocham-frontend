import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

import { GetPostsResponse } from '@/apis/dto/posts/get-posts';
import { axiosInstance } from '@/libs/axios';
import { userAtom } from '@/states/userData';

export default function useGetPosts({
  initialPostId,
}: {
  initialPostId?: number;
} = {}) {
  const { route } = useParams();
  const userInfo = useAtomValue(userAtom);
  const authorId = route === 'my' ? userInfo.userId : undefined;
  const participatingUserId =
    route === 'participated' ? userInfo.userId : undefined;

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
