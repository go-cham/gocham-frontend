/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import PostListLayer from "../../_components/post/list/PostListLayer";
import styled from "@emotion/styled";
import palette from "../../style/color";
import LogoAndTitle from "../../images/Common/LogoAndTitle.svg";

const H1 = css`
  margin-top: 1.8rem;
  font-weight: 700;
  font-size: 2.7rem;
`;

const Home = () => {
  return (
    <MainView>
      <div className={"title"}>
        <h1 css={H1}>
          <img src={LogoAndTitle} alt={"로고와타이틀"} />
        </h1>
      </div>
      <div style={{ height: "8.6rem" }} />
      <PostListLayer />
    </MainView>
  );
};

export default Home;

const MainView = styled.div`
  overflow-y: hidden;
  height: 100vh;
  width: 100%;
  position: relative;
  & .title {
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    background-color: white;
    padding-left: 3rem;
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid ${palette.Gray3};
    filter: drop-shadow(0px 0px 4px rgba(42, 45, 55, 0.1));
  }
`;
