import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { GetPostsResponse } from '@/apis/dto/posts/get-posts';
import { POST_TYPE } from '@/constants/post-type';
import { axiosInstance } from '@/libs/axios';
import { Post } from '@/types/post';

interface getPostsArgs {
  authorId?: number;
  participatingUserId?: number;
  pageParam?: number;
}

async function getPosts({
  authorId,
  participatingUserId,
  pageParam,
}: getPostsArgs) {
  const res = await axiosInstance.get<GetPostsResponse>('/worries', {
    params: {
      sort: 'DESC',
      take: 10,
      nextCursorId: pageParam,
      authorId,
      participatingUserId,
    },
  });
  return res.data;
}

export default function useGetPosts({
  initialPostId,
  userId,
  type,
}: {
  initialPostId?: number;
  userId?: number;
  type: POST_TYPE;
}) {
  const { data, ...queryInfo } = useInfiniteQuery({
    queryKey: ['posts', { initialPostId, userId, type }],
    queryFn: ({ pageParam = initialPostId && initialPostId + 1 }) =>
      getPosts({
        pageParam,
        authorId: type === POST_TYPE.MY ? userId : undefined,
        participatingUserId:
          type === POST_TYPE.PARTICIPATED ? userId : undefined,
      }),
    getNextPageParam: (lastPage) => lastPage.meta.nextId,
    suspense: true,
    enabled: type === POST_TYPE.ALL || !!userId,
  });
  const { hasNextPage, fetchNextPage } = queryInfo;

  const { ref, inView } = useInView({
    rootMargin: '100px 0px 0px 0px',
  });

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const posts: Post[] | null =
    data?.pages.map((page) => page.data).flat() || null;
  const totalCount = data?.pages[0].meta.total || 0;

  return { posts, ref, totalCount, ...queryInfo };
}
