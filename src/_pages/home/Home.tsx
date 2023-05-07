/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useEffect } from "react";
import VoteComponent from "../../_components/vote/VoteComponent";
import { RouteURL } from "../../App";
import AuthenticationCheck from "../../utils/AuthenticationCheck";
import PostListLayer from "../../_components/post/list/PostListLayer";
import styled from "@emotion/styled";
import palette from "../../style/color";

const H1 = css`
  margin-top: 4rem;
  font-weight: 700;
  font-size: 2.7rem;
`;

const Home = () => {
  return (
    <MainView>
      <div className={"title"}>
        <h1 css={H1}>고민의 참견</h1>
      </div>
      <PostListLayer />
      {/*<VoteComponent />*/}
    </MainView>
  );
};

export default Home;

const MainView = styled.div`
  width: 100%;
  & .title {
    width: 100vw;
    position: fixed;
    background-color: white;
    padding-left: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 0.1rem solid ${palette.Gray3};
    filter: drop-shadow(0px 0px 4px rgba(42, 45, 55, 0.1));
  }
`;
