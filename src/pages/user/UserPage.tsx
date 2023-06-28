/** @jsxImportSource @emotion/react */
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import PostCard from '@/components/post/PostCard';
import SelectMyPostType from '@/components/user/SelectMyPostType';
import UserProfile from '@/components/user/UserProfile';
import { userType } from '@/constants/userTypeEnum';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import { userAtom } from '@/states/userData';
import { PostingMetaDataType } from '@/types/post';

/**
 * 본인의 피드인지 확인하여 MyFeed 컴포넌트를 올릴지, user 컴포넌트를 올릴지 선택
 * @constructor
 */
const UserPage = () => {
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();
  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userType !== userType.activatedUser) navigate(RouteURL.home);
  }, [userInfo]);

  // isMyFeed는 미사용. 추후 타인의 프로필에 접근하는 기능이 생기면 디밸롭.
  const [isMyFeed, setIsMyFeed] = useState(true);
  const [userData, setUserData] = useAtom(userAtom);
  const [userProfile, setUserProfile] = useState({});
  // 내 게시글 | 참여한 게시글 스위칭
  const [postType, setPostType] = useState('내 게시글');
  const [needSwitchPostList, setNeedSwitchPostList] = useState(false);

  const switchPostType = (type: string) => {
    setPostType(type);
    setNeedSwitchPostList(true);
    setIsLoading(true);
  };
  const [postingCount, setPostingCount] = useState({
    written: 0,
    participated: 0,
  });
  useEffect(() => {
    //   유저 정보 조회
    if (userData.userId) {
      ApiConfig.request({
        method: HttpMethod.GET,
        url: EndPoint.user.get.USER,
        path: { id: userData.userId },
      })?.then((res) => {
        setUserProfile(res?.data);
      });
      ApiConfig.request({
        method: HttpMethod.GET,
        url: EndPoint.worry.get.WORRIES,
        query: {
          sort: 'DESC',
          take: 5,
          authorId: userInfo.userId,
        },
      })?.then((res) => {
        setPostingCount((value) => ({
          ...value,
          written: res?.data.meta.total,
        }));
      });
    }

    // 참여한 게시글 카운트

    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.worry.get.WORRIES,
      query: {
        sort: 'DESC',
        take: 5,
        participatingUserId: userInfo.userId,
      },
    })?.then((res) => {
      setPostingCount((value) => ({
        ...value,
        participated: res?.data.meta.total,
      }));
    });
  }, [userData]);

  const [postingData, setPostingData] = useState<any[]>([]);
  const [postingMetaData, setPostingMetaData] = useState<PostingMetaDataType>({
    take: 5,
  });
  // 무한스크롤
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 처음 페이지 로딩 시에만 데이터 가져오기
    if (isLoading) {
      fetchData();
    }
  }, [userData, isLoading]);

  const fetchData = async () => {
    // console.log("쉿 패치중");
    let reqData;
    if (postType === '내 게시글') {
      if (!needSwitchPostList && postingMetaData.nextId) {
        reqData = {
          sort: 'DESC',
          take: 5,
          nextCursorId: postingMetaData.nextId,
          authorId: userInfo.userId,
        };
      } else {
        reqData = {
          sort: 'DESC',
          take: 5,
          authorId: userInfo.userId,
        };
      }
    } else if (postType === '참여한 게시글') {
      if (!needSwitchPostList && postingMetaData.nextId) {
        reqData = {
          sort: 'DESC',
          take: 5,
          nextCursorId: postingMetaData.nextId,
          participatingUserId: userInfo.userId,
        };
      } else {
        reqData = {
          sort: 'DESC',
          take: 5,
          participatingUserId: userInfo.userId,
        };
      }
    }

    if (userData.userId) {
      try {
        // console.log(reqData);
        const res = await ApiConfig.request({
          method: HttpMethod.GET,
          url: EndPoint.worry.get.WORRIES,
          query: reqData,
        });
        if (needSwitchPostList) {
          setPostingData(res?.data.data);
          setNeedSwitchPostList(false);
          setPostingMetaData({
            take: 5,
          });
        } else {
          setPostingData((prevPosts) => [
            ...prevPosts,
            ...(res?.data.data || []),
          ]);
        }
        setPostingMetaData(res?.data.meta);
        setHasMore(res?.data.meta.hasNextData);

        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // 무한스크롤
  useEffect(() => {
    // IntersectionObserver 등록하기
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px 100px 0px',
      threshold: 1,
    });

    // 마지막 요소에 observer 등록하기
    const lastItem = document.querySelector('.user:last-child');
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
    <div className="flex h-full flex-col">
      {/*프로필 부분*/}
      <UserProfile
        isMyFeed={isMyFeed}
        userData={userData}
        userProfile={userProfile}
      />

      {/*내 게시글 & 참여한 게시글 선택 부분*/}
      <SelectMyPostType
        postType={postType}
        switchPostType={switchPostType}
        postingCount={postingCount}
      />

      {/*피드 부분*/}
      {/*  여긴 홈 페이지 만드는걸로 적용 */}

      <ul className="flex flex-1 flex-col items-center space-y-[1.7rem] overflow-y-scroll pb-[16rem]">
        {postingData?.map((value, idx) => (
          <li key={idx} className={'user'}>
            <PostCard
              userInfo={userInfo}
              postData={value}
              routeUrl={postType === '내 게시글' ? 'my' : 'participated'}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
