/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import react, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectMyPostType from "../../_components/user/SelectMyPostType";
import UserProfile from "../../_components/user/UserProfile";
import { userAtom } from "../../atom/userData";
import { useAtom } from "jotai";
import { RouteURL } from "../../App";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import { postingMetaDataType } from "../../_components/post/list/PostListLayer";
import PostListComponent from "../../_components/post/list/PostListComponent";
import React from "react";
import styled from "@emotion/styled";
import { useAtomValue } from "jotai";

/**
 * 본인의 피드인지 확인하여 MyFeed 컴포넌트를 올릴지, user 컴포넌트를 올릴지 선택
 * @constructor
 */
const User = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useAtomValue(userAtom);

  // isMyFeed는 미사용. 추후 타인의 프로필에 접근하는 기능이 생기면 디밸롭.
  const [isMyFeed, setIsMyFeed] = useState(true);
  const [userData, setUserData] = useAtom(userAtom);
  const [userProfile, setUserProfile] = useState({});
  // 내 게시글 | 참여한 게시글 스위칭
  const [postType, setPostType] = useState("내 게시글");

  useEffect(() => {
    //   본인 피드인지 확인
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.user.get.USER,
      // url: `${EndPoint.user.get.USER}/${userData.userId}`,
      path: { id: userData.userId },
    })?.then((res) => {
      console.log(res);
      setUserProfile(res?.data);
    });

    // /user뒤의 파라미터가 있는지 확인. 없으면 본인 피드로 navigate
    // 게시글 조회 + 게시글 수
  }, []);
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
    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  const fetchData = async () => {
    let reqData;

    if (postingMetaData.nextId) {
      reqData = {
        sort: "DESC",
        take: 5,
        nextCursorId: postingMetaData.nextId,
        authorId: userInfo.userId,
      };
    } else {
      reqData = {
        sort: "DESC",
        take: 5,
        authorId: userInfo.userId,
      };
    }
    try {
      console.log(reqData);
      const res = await ApiConfig.request({
        method: HttpMethod.GET,
        url: EndPoint.worry.get.WORRIES,
        query: reqData,
      });
      // 새로 가져온 데이터와 기존 데이터 합치기
      setPostingData((prevPosts) => [...prevPosts, ...res?.data.data]);
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
      rootMargin: "0px 0px 100px 0px",
      threshold: 1.0,
    });

    // 마지막 요소에 observer 등록하기
    const lastItem = document.querySelector(".user:last-child");
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
    <>
      {/*프로필 부분*/}
      <UserProfile
        isMyFeed={isMyFeed}
        userData={userData}
        userProfile={userProfile}
      />

      {/*내 게시글 & 참여한 게시글 선택 부분*/}
      <SelectMyPostType postType={postType} setPostType={setPostType} />

      {/*피드 부분*/}
      {/*  여긴 홈 페이지 만드는걸로 적용 */}

      <PostListLayerStyle>
        {postingData?.map((value, idx) => (
          <div key={idx} className={"user"}>
            <PostListComponent userInfo={userInfo} postData={value} />
          </div>
        ))}
      </PostListLayerStyle>
    </>
  );
};

export default User;

const PostListLayerStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0 10rem;
  justify-content: center;
`;
