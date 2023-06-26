import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

import { GetWorriesResponse } from '@/apis/dto/worries/get-worries';
import { EndPoint } from '@/dataManager/apiMapper';
import { getBearerToken } from '@/dataManager/localStorageManager';
import { userAtom } from '@/states/userData';

export default function usePostsWithInfiniteScroll({
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
    queryKey: ['worries', initialPostId, authorId, participatingUserId],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get<GetWorriesResponse>(
        EndPoint.worry.get.WORRIES,
        {
          params: {
            sort: 'DESC',
            take: 5,
            nextCursorId: pageParam || initialPostId,
            authorId,
            participatingUserId,
          },
          headers: {
            Authorization: `Bearer ${getBearerToken()}`,
          },
        }
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.meta.nextId || undefined,
  });

  const { ref, inView } = useInView({
    rootMargin: '100px 0px 0px 0px',
  });

  useEffect(() => {
    if (inView) {
      void fetchNextPage();
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
