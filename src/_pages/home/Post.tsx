/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import PostComponent from "../../_components/post/post/PostComponent";
import AppBar from "../../_components/common/AppBar";
import { useAtomValue } from "jotai";
import { userAtom } from "../../atom/userData";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import { postingMetaDataType } from "../../_components/post/postList/PostListLayer";
import palette from "../../style/color";

const Post = () => {
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
    if (isLoading) {
      fatchData();
    }
  }, [isLoading]);

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
      rootMargin: "0px",
      threshold: 1.0,
    });

    // 마지막 요소에 observer 등록하기
    const lastItem = document.querySelector(".post:last-child");
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
      <AppBar title={"인기 게시물"} background={"white"} />
      <PostLayer>
        {postingData?.map((value, idx) => (
          <div key={idx} className={"post"}>
            <PostComponent userInfo={userInfo} postData={value} />
          </div>
        ))}
      </PostLayer>
    </>
  );
};
export default Post;

const PostLayer = styled.div`
  height: calc(100vh - 4.6rem);
  overflow: scroll;
`;
