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
import { formatText } from "../../../utils/formatText";
import ApiConfig, { HttpMethod } from "../../../dataManager/apiConfig";
import { EndPoint } from "../../../dataManager/apiMapper";
import { postDataType } from "../../../type/postDataType";
import { useAtom } from "jotai/index";
import { refreshChatAtom } from "../../../atom/postRefreshRequest";
import { handleRefreshPostData } from "../../../utils/handleRefreshPostData";

const PostListComponent = ({
  userInfo,
  postData,
  routeUrl,
}: {
  userInfo: userDataAtomType;
  postData: any;
  routeUrl?: string;
}) => {
  const navigate = useNavigate();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const handleGoPostDetail = () => {
    if (routeUrl) {
      navigate(`${RouteURL.feed}/${thisPostData.id}/${routeUrl}`);
    } else {
      navigate(`${RouteURL.feed}/${thisPostData.id}`);
    }
  };
  const handleClickPostChat = () => {
    if (userInfo.userType === "activatedUser") {
      setOpenBottomSheet((value) => {
        console.log(value, "->", !value);
        return !value;
      });
    } else {
      navigate(RouteURL.auth_check);
    }
  };
  const [thisPostData, setThisPostData] = useState<postDataType>(postData);
  useEffect(() => {
    setThisPostData(postData);
  }, []);

  const [needRefresh, setNeedRefresh] = useAtom(refreshChatAtom);
  // 댓글이나 투표할 경우 해당 컨텐츠만 리프레시.
  useEffect(() => {
    if (needRefresh.worryIdx === postData.id) {
      console.log("needRefresh 작동중");
      setThisPostData(
        handleRefreshPostData(thisPostData, needRefresh.updateObject)
      );
      setNeedRefresh({ worryIdx: null, updateObject: "" });
    }
  }, [needRefresh]);
  return (
    <>
      <PostListBox>
        <div>
          <PostProfileBox
            nickname={
              thisPostData.user?.nickname ? thisPostData.user.nickname : "익명"
            }
            profileImg={
              thisPostData.user?.profileImageUrl
                ? thisPostData.user.profileImageUrl
                : null
            }
          />
          <PostContentBox onClick={() => handleGoPostDetail()}>
            <PostContentText haveImage={!!thisPostData.worryFiles[0]?.url}>
              <h1>{thisPostData.title}</h1>
              <div className={"content"}>
                {formatText(thisPostData.content)}
              </div>
            </PostContentText>
            {thisPostData.worryFiles[0]?.url && (
              <img
                src={thisPostData.worryFiles[0]?.url}
                alt={"게시글이미지"}
                className={"게시글이미지"}
              />
            )}
          </PostContentBox>
        </div>
        <PostMetaContent>
          <div className={"chat"} onClick={() => handleClickPostChat()}>
            댓글 {thisPostData.replyCount}개 모두 보기
          </div>
          <div className={"voteCount"}>
            현재 투표한 사용자 {thisPostData.userWorryChoiceCount}명
          </div>
        </PostMetaContent>
      </PostListBox>
      <ChatBottomSheet
        openBottomSheet={openBottomSheet}
        handleClickPostChat={handleClickPostChat}
        postId={thisPostData.id}
        postData={thisPostData}
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
  position: relative;
`;

const PostContentText = styled.div<{ haveImage: boolean }>`
  width: ${({ haveImage }) => (haveImage ? "calc(100% - 7.2rem)" : "100%")};

  & h1 {
    font-weight: 700;
    font-size: 1.6rem;
    letter-spacing: -0.03rem;
    line-height: 1.9rem;
    color: ${palette.Text1};
  }
  & .content {
    margin-top: 0.5rem;
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.9rem;
    color: ${palette.Text2};
    height: 1.6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const PostContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 1.5rem;
  & .게시글이미지 {
    width: 7.2rem;
    height: 7.2rem;
    object-fit: cover;
  }
`;
