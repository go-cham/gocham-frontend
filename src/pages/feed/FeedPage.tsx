import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RouteURL } from '@/App';
import AppBar from '@/components/layout/AppBar';
import { userType } from '@/constants/userTypeEnum';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import { userAtom } from '@/states/userData';
import { PostingMetaDataType } from '@/types/post';

import PostDetail from './PostDetail';

const FeedPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userInfo = useAtomValue(userAtom);
  const [postingData, setPostingData] = useState<any[]>([]);
  const [postingMetaData, setPostingMetaData] = useState<PostingMetaDataType>({
    take: 5,
  });
  // 무한스크롤
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // const [routeUrl, setRouteUrl] = useState('');

  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userId === 0) {
      if (userInfo.userType !== userType.activatedUser) navigate(RouteURL.home);
    }
  }, [userInfo]);

  useEffect(() => {
    // 처음 페이지 로딩 시에만 데이터 가져오기

    if (isLoading) {
      fatchData();
    }
  }, [isLoading]);

  const fatchData = async () => {
    let reqData = {};
    // route가 있다면 무조건 postId도 있다.
    if (params.route === 'my') {
      reqData = {
        authorId: userInfo.userId,
        nextCursorId: Number(params.id) + 1,
      };
    } else if (params.route === 'participated') {
      reqData = {
        participatingUserId: userInfo.userId,
        nextCursorId: Number(params.id) + 1,
      };
    } else if (params.id) {
      reqData = { nextCursorId: Number(params.id) + 1 };
    }
    if (postingMetaData.nextId) {
      reqData = {
        ...reqData,
        sort: 'DESC',
        take: 5,
        nextCursorId: postingMetaData.nextId,
      };
    } else {
      reqData = {
        ...reqData,
        sort: 'DESC',
        take: 5,
      };
    }
    try {
      // console.log(reqData);
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
    const lastItem = document.querySelector('#post-item:last-child');
    // document
    //   .querySelector(".postComponent:last-child")
    //   ?.setAttribute("name", "이거");

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
    // console.log(target.isIntersecting);

    // observer가 타겟 요소와 교차하면 데이터 추가 요청하기
    if (target.isIntersecting && hasMore) {
      setIsLoading(true);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <AppBar
        title={
          params.route === 'my'
            ? '내 게시글'
            : params.route === 'participated'
            ? '참여한 게시글'
            : '인기 게시물'
        }
        background={'white'}
        navigateRoute={params.route ? RouteURL.user : RouteURL.home}
      />
      <ul
        className="flex-1 overflow-y-scroll"
        style={{ scrollSnapType: 'y proximity', scrollSnapAlign: 'start' }}
      >
        {postingData?.map((value, idx) => (
          <li key={idx} id="post-item">
            <PostDetail userInfo={userInfo} postData={value} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
