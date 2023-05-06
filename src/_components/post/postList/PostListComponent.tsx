/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import ProfileImg from "../../../images/PostComponent/profileImg.png";
import CGP from "../../../images/PostComponent/GCP.png";
import PostProfileBox from "../PostProfileBox";
import palette from "../../../style/color";
import { useNavigate } from "react-router-dom";
import { RouteURL } from "../../../App";

const PostListComponent = () => {
  const navigate = useNavigate();
  //   포스트 이미지 여부 확인후 처리 필요

  const handleGoPostDetail = () => {
    navigate(RouteURL.post, { state: 12 });
  };
  return (
    <PostListBox onClick={() => handleGoPostDetail()}>
      <div>
        <PostProfileBox nickname={"닉넹미"} profileImg={null} />
        <PostContentBox>
          <PostContentText>
            <h1>제목</h1>
            <h2>내용</h2>
          </PostContentText>
          <img src={CGP} alt={"게시글 이미지"} />
          {/*    이미지 없으면 표시안하도록 처리 필요*/}
        </PostContentBox>
      </div>
      <PostMetaContent>
        <div className={"chat"}>댓글 n개 모두 보기</div>
        <div className={"voteCount"}>현재 투표한 사용자 m명</div>
      </PostMetaContent>
    </PostListBox>
  );
};

export default PostListComponent;

const PostMetaContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  & .chat {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    letter-spacing: -0.03rem;
    color: ${palette.Text2};
  }
  & .voteCount {
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.2rem;
    letter-spacing: -0.03rem;
    color: ${palette.Text3};
  }
`;

const PostListBox = styled.div`
  box-sizing: border-box;
  width: 34rem;
  height: 16.5rem;
  padding: 1.7rem;
  background-color: white;
  box-shadow: 0px 0px 0.4rem rgba(42, 45, 55, 0.1);
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostContentText = styled.div`
  & h1 {
    font-weight: 700;
    font-size: 1.6rem;
    letter-spacing: -0.03rem;
    line-height: 1.9rem;
    color: ${palette.Text1};
  }
  & h2 {
    margin-top: 0.5rem;
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.9rem;
    color: ${palette.Text2};
  }
`;

const PostContentBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 1.5rem;
`;
