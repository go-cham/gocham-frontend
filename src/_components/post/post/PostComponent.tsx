/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import PostProfileBox from "../PostProfileBox";
import ChatIcon from "../../../images/PostComponent/chat.svg";
import ShareIcon from "../../../images/PostComponent/share.svg";
import palette from "../../../style/color";
import ClockIcon from "../../../images/PostComponent/clock.svg";
import CheckIcon from "../../../images/PostComponent/check.svg";
import { RouteURL } from "../../../App";
import { useState } from "react";
import ChatBottomSheet from "../../chat/ChatBottomSheet";
import PostVoteComponent from "./PostVoteComponent";

export const handleClickShare = async (postId: number) => {
  // https 배포에서만 확인 가능.
  alert("개발자: 모바일에선 https 배포에서만 확인가능. 정상작동시 alert 제거");
  try {
    await navigator.share({
      title: "링크 공유",
      text: "이 링크를 공유합니다.",
      url: `${process.env.REACT_APP_BASE_URL}${RouteURL.post}/${postId}`,
    });
    console.log("링크가 공유되었습니다.");
  } catch (error) {
    console.error("링크 공유 에러", error);
  }
};

const PostComponent = () => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const imgUrl = "https://via.placeholder.com/200X200";
  const postId = 5;
  const handlePostMeatballsMenu = () => {
    console.log("hola");
  };

  const handleClickPostChat = () => {
    setOpenBottomSheet((value) => {
      // console.log(value, "->", !value);
      return !value;
    });
  };

  return (
    <>
      <PostComponentLayer>
        <div style={{ height: "2.1rem" }}></div>
        <PostProfileBox
          nickname={"닉넹미"}
          menuFunction={handlePostMeatballsMenu}
        />
        <h1>어떤 옷을 입을까용?</h1>
        <h2>이 윗옷이랑 어울리는 옷이 뭘지 고민되네요.</h2>
      </PostComponentLayer>
      {/*{imgUrl && <PostImageComponentLayer src={imgUrl} />}*/}
      <PostComponentLayer>
        <div className={"마감"}>
          <img src={ClockIcon} alt={"마감시간"} />
          <p className={"마감시간"}>마감까지 n일 nn:nn:nn</p>
        </div>
        <PostVoteComponent postId={postId} />
        {/**/}
        <div className={"voting"}>
          <p className={"justResult"}>결과만 볼래요</p>
          <p className={"result"}>현재 투표한 사용자 nnn명</p>
        </div>
        <div className={"toolbar"}>
          <img
            src={ChatIcon}
            alt={"댓글"}
            onClick={() => handleClickPostChat()}
          />
          <img
            src={ShareIcon}
            alt={"공유"}
            onClick={() => handleClickShare(postId)}
          />
        </div>

        <div className={"chatCount"} onClick={() => handleClickPostChat()}>
          댓글 nn개 모두 보기
        </div>
      </PostComponentLayer>
      <ChatBottomSheet
        openBottomSheet={openBottomSheet}
        handleClickPostChat={handleClickPostChat}
        postId={postId}
      />
    </>
  );
};

export default PostComponent;

const PostComponentLayer = styled.div`
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  background-color: white;
  & .toolbar {
    margin-top: 1.7rem;
    margin-bottom: 1.3rem;
  }
  & .chatCount {
    font-size: 1.2rem;
    padding-bottom: 1.7rem;
  }
  & .voting {
    display: flex;
    justify-content: space-between;
    & .justResult {
      text-decoration-line: underline;
      font-size: 1.2rem;
      color: ${palette.Text2};
    }
    & .result {
      font-size: 1.2rem;
      color: ${palette.Text3};
    }
  }

  & .마감 {
    padding-top: 1.9rem;
    display: flex;
    align-items: center;
    & .마감시간 {
      margin-left: 0.6rem;
      font-weight: 500;
      font-size: 1.2rem;
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
  }
`;

const PostImageComponentLayer = styled.img`
  width: 100vw;
  max-height: 29.25rem;
  object-fit: contain;
`;
