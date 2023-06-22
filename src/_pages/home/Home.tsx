/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';

import PostListLayer from '@/_components/post/list/PostListLayer';
import LogoAndTitle from '@/images/Common/LogoAndTitle.svg';
import palette from '@/styles/color';

const Home = () => {
  return (
    <MainView>
      <div className={'title'}>
        <img src={LogoAndTitle} alt={'로고와타이틀'} />
      </div>
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
    background-color: white;
    padding: 2rem 0 2rem 3rem;
    border-bottom: 0.1rem solid ${palette.Gray3};
    filter: drop-shadow(0px 0px 4px rgba(42, 45, 55, 0.1));
  }
`;
