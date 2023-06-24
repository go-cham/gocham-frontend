import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import { userAtom } from '@/states/userData';

import PostCard from './PostCard';

export type postingMetaDataType = {
  take: number;
  total?: number;
  hasNextData?: boolean;
  nextId?: number;
};
const PostCardList = () => {
  const userInfo = useAtomValue(userAtom);
  const [postingData, setPostingData] = useState<any[]>([]);
  const [postingMetaData, setPostingMetaData] = useState<postingMetaDataType>({
    take: 5,
  });
  // 무한스크롤
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 처음 페이지 로딩 시에만 데이터 가져오기
    if (
      (isLoading && userInfo.userId) ||
      (isLoading && userInfo.userId === 0)
    ) {
      fatchData();
    }
  }, [isLoading, userInfo]);

  const fatchData = async () => {
    let reqData;

    if (postingMetaData.nextId) {
      reqData = {
        sort: 'DESC',
        take: 5,
        nextCursorId: postingMetaData.nextId,
      };
    } else {
      reqData = {
        sort: 'DESC',
        take: 5,
      };
    }
    try {
      const res = await ApiConfig.request({
        method: HttpMethod.GET,
        url: EndPoint.worry.get.WORRIES,
        query: reqData,
      });
      // 새로 가져온 데이터와 기존 데이터 합치기
      setPostingData((prevPosts) => [...prevPosts, ...(res?.data.data || [])]);
      setPostingMetaData(res?.data.meta);
      setHasMore(res?.data.meta.hasNextData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // 무한스크롤
  useEffect(() => {
    // IntersectionObserver 등록하기
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px 100px 0px',
      threshold: 0.5,
    });

    // 마지막 요소에 observer 등록하기
    const lastItem = document.querySelector('#post-card:last-child');
    if (lastItem) {
      observer.current.observe(lastItem);
    }

    // 컴포넌트 언마운트 시 observer 해제하기
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [postingData]);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];

    // observer가 타겟 요소와 교차하면 데이터 추가 요청하기
    if (target.isIntersecting && hasMore) {
      setIsLoading(true);
    }
  };

  return (
    <ul className="flex flex-col items-center space-y-[1.7rem] pb-[10rem] pt-[2rem]">
      {postingData?.map((value, idx) => (
        <li id="post-card" key={idx}>
          <PostCard userInfo={userInfo} postData={value} />
        </li>
      ))}
    </ul>
  );
};
export default PostCardList;
