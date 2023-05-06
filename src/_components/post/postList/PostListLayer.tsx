/** @jsxImportSource @emotion/react */

/**
 * 포스트 리스트 레이어
 */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import ApiConfig, { HttpMethod } from "../../../dataManager/apiConfig";
import { EndPoint } from "../../../dataManager/apiMapper";
import PostListComponent from "./PostListComponent";
import styled from "@emotion/styled";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../atom/userData";

type postingMetaDataType = {
  take: number;
  total?: number;
  hasNextData?: boolean;
  nextId?: number;
};
const PostListLayer = () => {
  const userInfo = useAtomValue(userAtom);
  const [postingMetaData, setPostingMetaData] = useState<postingMetaDataType>({
    take: 4,
  });
  const [postingData, setPostingData] = useState([]);
  useEffect(() => {
    fatchData();
    // 데이터 받기
  }, []);
  const fatchData = async () => {
    let reqData;

    if (postingMetaData.nextId) {
      reqData = {
        sort: "DESC",
        take: postingMetaData.take,
        nextCursorId: postingMetaData.nextId,
      };
    } else {
      reqData = {
        sort: "DESC",
        take: postingMetaData.take,
      };
    }

    const res = await ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.worry.get.WORRIES,
      data: reqData,
    });
    console.log(res?.data);
    setPostingData(res?.data.data);
    setPostingMetaData(res?.data.meta);
  };
  return (
    <PostListLayerStyle>
      {/*{postingData?.map((value, key) => (*/}
      {/*  <PostListComponent key={key} />*/}
      {/*))}*/}
      <PostListComponent userInfo={userInfo} />
    </PostListLayerStyle>
  );
  // 바닥에 닿을경우 처리할 함수가 필요.
};
export default PostListLayer;

const PostListLayerStyle = styled.div`
  width: 100vw;
  display: flex;
  margin: 2.2rem 0;
  justify-content: center;
`;
