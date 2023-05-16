/** @jsxImportSource @emotion/react */

/**
 * 포스트 리스트 레이어
 */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import ApiConfig, { HttpMethod } from "../../../dataManager/apiConfig";
import { EndPoint } from "../../../dataManager/apiMapper";
import PostListComponent from "./PostListComponent";
import styled from "@emotion/styled";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../atom/userData";

export type postingMetaDataType = {
  take: number;
  total?: number;
  hasNextData?: boolean;
  nextId?: number;
};
const PostListLayer = () => {
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
        sort: "DESC",
        take: 5,
        nextCursorId: postingMetaData.nextId,
      };
    } else {
      reqData = {
        sort: "DESC",
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
      threshold: 0.5,
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
    <PostListLayerWrap>
      <PostListLayerStyle>
        {postingData?.map((value, idx) => (
          <div key={idx} className={"user"}>
            <PostListComponent userInfo={userInfo} postData={value} />
          </div>
        ))}
      </PostListLayerStyle>
      <div style={{ height: "10rem" }} />

    </PostListLayerWrap>
  );
};
export default PostListLayer;

const PostListLayerWrap = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

const PostListLayerStyle = styled.div`
  //width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0 10rem;
  justify-content: center;
  //height: calc(100vh - 8rem);
`;
