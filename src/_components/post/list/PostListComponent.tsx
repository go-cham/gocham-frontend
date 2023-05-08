/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ProfileImg from "../../../images/PostComponent/profileImg.png";
import CGP from "../../../images/PostComponent/GCP.png";
import PostProfileBox from "../PostProfileBox";
import palette from "../../../style/color";
import { Route, useNavigate } from "react-router-dom";
import { RouteURL } from "../../../App";
import ChatBottomSheet from "../../chat/ChatBottomSheet";
import { userInfo } from "os";
import { userDataAtomType } from "../../../atom/userData";

const PostListComponent = ({
  userInfo,
  postData,
  routeUrl,
}: {
  userInfo: userDataAtomType;
  postData: any;
  routeUrl?: string;
}) => {
  console.log(postData);
  const navigate = useNavigate();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const handleGoPostDetail = () => {
    if (routeUrl) {
      navigate(`${RouteURL.feed}/${postData.id}/${routeUrl}`);
    } else {
      navigate(`${RouteURL.feed}/${postData.id}`);
    }
  };
  const handleClickPostChat = () => {
    if (userInfo.userType === "activatedUser") {
      setOpenBottomSheet((value) => {
        // console.log(value, "->", !value);
        return !value;
      });
    } else {
      navigate(RouteURL.auth_check);
    }
  };
  return (
    <>
      <PostListBox>
        <div>
          <PostProfileBox
            nickname={postData.user.nickname ? postData.user.nickname : "익명"}
            profileImg={
              postData.user.profileImageUrl
                ? postData.user.profileImageUrl
                : null
            }
          />
          <PostContentBox onClick={() => handleGoPostDetail()}>
            <PostContentText>
              <h1>{postData.title}</h1>
              <h2>{postData.content}</h2>
            </PostContentText>
            {postData.worryFiles[0]?.url && (
              <img
                src={postData.worryFiles[0]?.url}
                alt={"게시글이미지"}
                className={"게시글이미지"}
              />
            )}
          </PostContentBox>
        </div>
        <PostMetaContent>
          <div className={"chat"} onClick={() => handleClickPostChat()}>
            댓글 {postData.replyCount}개 모두 보기
          </div>
          <div className={"voteCount"}>
            현재 투표한 사용자 {postData.userWorryChoiceCount}명
          </div>
        </PostMetaContent>
      </PostListBox>
      <ChatBottomSheet
        openBottomSheet={openBottomSheet}
        handleClickPostChat={handleClickPostChat}
        postId={postData.id}
        postData={postData}
      />
    </>
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
    color: ${palette.Text2};
  }
  & .voteCount {
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.2rem;
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
  margin: 0 0 1.7rem 0;
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
  & .게시글이미지 {
    width: 7.2rem;
    height: 7.2rem;
    object-fit: cover;
  }
`;
