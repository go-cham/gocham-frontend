import React, { useEffect, useState } from "react";
import PostProfileBox from "../post/PostProfileBox";
import styled from "@emotion/styled";
import palette from "../../style/color";
import ChatIcon from "../../images/PostComponent/chat.svg";
import ShareIcon from "../../images/PostComponent/share.svg";
import SendIcon from "../../images/PostComponent/send.svg";
import { handleClickShare } from "../post/post/PostComponent";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import { userDataAtomType } from "../../atom/userData";

export default function Content({
  openBottomSheet,
  postId,
  userInfo,
}: {
  openBottomSheet: boolean;
  postId: number;
  userInfo: userDataAtomType;
}) {
  useEffect(() => {
    if (openBottomSheet) {
      console.log(postId);
    }
  }, [openBottomSheet]);
  useEffect(() => {
    console.log("모바일 브라우저 상태에서는 하단에 더 값 줘야함.");
  }, []);

  const [chatText, setChatText] = useState("");
  const handlePushChat = async () => {
    console.log(chatText);
    try {
      const res = await ApiConfig.request({
        method: HttpMethod.POST,
        url: EndPoint.worry.post.WORRY_REPLY,
        data: {
          content: chatText,
          userId: userInfo.userId,
          worryId: 5,
        },
      });
      console.log(res);
      console.log("댓글 리프레시 로직 필요");
    } catch (e) {
      console.log(e);
    }

    setChatText("");
  };
  return (
    <div>
      <PostChatWrap>
        <PostProfileBox nickname={"닉넹미"} />
        <h1>어떤 옷을 입을까요?</h1>
        <h2>이 윗옷이랑 어울리는 옷이 뭘지 고민되네요.</h2>
        <div className={"toolbar"}>
          <img
            src={ShareIcon}
            alt={"공유"}
            onClick={() => handleClickShare(postId)}
          />
          <p className={"result"}>현재 투표한 사용자 nnn명</p>
        </div>
      </PostChatWrap>
      <GrayBar />
      <PostChatWrap>
        <InputWrap>
          <input
            className={"댓글입력"}
            placeholder={"여러분들의 의견을 자유롭게 남겨주세요!"}
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
          />
          <img src={SendIcon} alt={"전송"} onClick={() => handlePushChat()} />
        </InputWrap>
        <UserChatBox>
          <div className={"metaData"}>
            <div>
              <PostProfileBox nickname={"닉넹미"} />
              {/* 유저 투표값에 따른 이모지 제공 필요*/}
            </div>
            <div className={"uploadDate"}>n일 전</div>
          </div>
          <p>
            살? 그런거 고민할거면 팝콘을 애초에 안먹습니다. 카라멜로 가시죠!
          </p>
        </UserChatBox>

        <br />
        <br />
        <br />
      </PostChatWrap>
    </div>
  );
}

const UserChatBox = styled.div`
  margin-top: 2.1rem;
  & .uploadDate {
    font-size: 1.2rem;
  }
  & .metaData {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & p {
    font-size: 1.4rem;
    margin-left: 3.3rem;
    margin-top: 0.9rem;
    width: 28rem;
  }
`;

const InputWrap = styled.div`
  margin-top: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .댓글입력 {
    width: 80%;
    height: 4.1rem;
    border: 0.1rem solid ${palette.Gray2};
    border-radius: 0.5rem;
  }
`;

const PostChatWrap = styled.div`
  padding: 0 1.7rem 0 1.9rem;

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
  & .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.7rem;
    margin-bottom: 1.3rem;
  }
  & .result {
    font-size: 1.2rem;
    color: ${palette.Text3};
  }
`;

const GrayBar = styled.div`
  background-color: ${palette.Gray3};
  width: 100vw;
  height: 0.1rem;
`;
