/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import PostProfileBox from "../PostProfileBox";
import ChatIcon from "../../../images/PostComponent/chat.svg";
import ShareIcon from "../../../images/PostComponent/share.svg";
import palette from "../../../style/color";
import ClockIcon from "../../../images/PostComponent/clock.svg";
import ChatAlertImage from "../../../images/PostComponent/share_image.svg";
import { RouteURL } from "../../../App";
import React, { useEffect, useState } from "react";
import ChatBottomSheet from "../../chat/ChatBottomSheet";
import PostVoteComponent from "./PostVoteComponent";
import { userDataAtomType } from "../../../atom/userData";
import { getRemainingTime } from "../../../utils/getRemainingTime";
import ApiConfig, { HttpMethod } from "../../../dataManager/apiConfig";
import { EndPoint } from "../../../dataManager/apiMapper";
import { formatText } from "../../../utils/formatText";
import { refreshChatAtom } from "../../../atom/postRefreshRequest";
import { useAtom } from "jotai";
import { postDataType } from "../../../type/postDataType";
import { handleRefreshPostData } from "../../../utils/handleRefreshPostData";
import { chatInputFocusAtom } from "../../../atom/chatInputFocus";

const PostComponent = ({
  userInfo,
  postData,
}: {
  userInfo: userDataAtomType;
  postData: postDataType;
}) => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  // console.log(postData);
  const handleClickMeatballsMenu = () => {
    console.log("hola");
  };
  const handleClickPostChat = () => {
    setOpenBottomSheet((value) => {
      // console.log(value, "->", !value);
      return !value;
    });
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
      {thisPostData.content !== undefined && (
        <PostComponentWrap>
          <PostComponentLayer>
            <div style={{ height: "2.1rem" }}></div>
            <PostProfileBox
              nickname={thisPostData.user.nickname}
              menuFunction={handleClickMeatballsMenu}
              profileImg={thisPostData.user.profileImageUrl}
            />
            <h1>{thisPostData.title}</h1>
            <h2>{formatText(thisPostData.content)}</h2>
          </PostComponentLayer>
          {thisPostData.worryFiles[0]?.url && (
            <PostImageComponentLayer
              src={thisPostData.worryFiles[0]?.url}
              alt={"게시글이미지"}
              className={"게시글이미지"}
            />
          )}
          <PostComponentLayer>
            <div className={"마감"}>
              <img src={ClockIcon} alt={"마감시간"} />
              <p className={"마감시간"}>
                {getRemainingTime(thisPostData.expirationTime)}
              </p>
            </div>
            <PostVoteComponent
              postData={thisPostData}
              userId={userInfo.userId}
              handleClickPostChat={handleClickPostChat}
            />
            <div className={"chatAndVotedUser"}>
              <div
                className={"chatCount"}
                onClick={() => handleClickPostChat()}
              >
                댓글 {thisPostData.replyCount}개 모두 보기
              </div>
              <p className={"result"}>
                현재 투표한 사용자 {postData.userWorryChoiceCount}명
              </p>
            </div>
          </PostComponentLayer>
          <ChatBottomSheet
            openBottomSheet={openBottomSheet}
            handleClickPostChat={handleClickPostChat}
            postId={thisPostData.id}
            postData={thisPostData}
          />
        </PostComponentWrap>
      )}
    </>
  );
};

export default PostComponent;

const PostComponentWrap = styled.div`
  border-bottom: 0.1rem solid ${palette.Gray3};
  position: relative;
`;

const PostComponentLayer = styled.div`
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  background-color: white;
  & .chatAndVotedUser {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
  }
  & .chatCount {
    font-size: 1.2rem;
    padding-bottom: 1.7rem;
    color: ${palette.Text3};
  }
  & .result {
    font-size: 1.2rem;
    color: ${palette.Text3};
  }

  & .마감 {
    padding-top: 1.9rem;
    display: flex;
    align-items: center;
    & .마감시간 {
      margin-left: 0.6rem;
      font-weight: 500;
      font-size: 1.2rem;
      color: ${palette.Primary};
      line-height: 1.4rem;
    }
  }
  & h1 {
    margin-top: 2.1rem;
    font-weight: 700;
    font-size: 1.8rem;
  }
  & h2 {
    margin-top: 1.3rem;
    font-weight: 400;
    font-size: 1.4rem;
    padding-bottom: 1.7rem;
    line-height: 2.1rem;
  }
`;

const PostImageComponentLayer = styled.img`
  width: 100%;
  max-height: 29.25rem;
  object-fit: contain;
`;
