import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { fetchPosts } from '@/apis/fetchers/fetch-posts';
import { POST_TYPE } from '@/constants/post-type';

export default function useGetPosts({
  initialPostId,
  userId,
  type,
}: {
  initialPostId?: number;
  userId?: number;
  type: POST_TYPE;
}) {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts', { initialPostId, userId, type }],
    queryFn: ({ pageParam = initialPostId ? initialPostId + 1 : undefined }) =>
      fetchPosts({
        pageParam,
        authorId: type === POST_TYPE.MY ? userId : null,
        participatingUserId: type === POST_TYPE.PARTICIPATED ? userId : null,
      }),
    suspense: true,
    enabled: !!userId,
    getNextPageParam: (lastPage) => lastPage.nextId,
  });

  const { ref, inView } = useInView({
    rootMargin: '100px 0px 0px 0px',
  });

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  const posts = data?.pages.map(({ posts }) => posts).flat() || [];

  return { posts, ref, totalCount: data?.pages[0].totalCount || 0 };
}
