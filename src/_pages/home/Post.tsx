/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import PostComponent from "../../_components/post/post/PostComponent";
import AppBar from "../../_components/common/AppBar";

const Post = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <AppBar title={"인기 게시물"} background={"white"} />
      <PostLayer>
        <PostComponent />
      </PostLayer>
    </>
  );
};
export default Post;

const PostLayer = styled.div`
  height: 82vh;
  overflow: scroll;
`;
