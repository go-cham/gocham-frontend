import React, { useEffect, useState } from "react";
import PostProfileBox from "../post/PostProfileBox";
import styled from "@emotion/styled";
import palette from "../../style/color";
import ChatIcon from "../../images/PostComponent/chat.svg";
import ShareIcon from "../../images/PostComponent/share.svg";
import SendIcon from "../../images/PostComponent/send.svg";
import { handleClickShare } from "../post/feed/PostComponent";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import { userDataAtomType } from "../../atom/userData";
import { formatDate } from "../../utils/formatDate";
import { formatText } from "../../utils/formatText";
import { debounce } from 'lodash';

export default function Content({
  openBottomSheet,
  postId,
  userInfo,
  postData,
}: {
  openBottomSheet: boolean;
  postId: number;
  userInfo: userDataAtomType;
  postData: any;
}) {
  function getChatData() {
    try {
      ApiConfig.request({
        method: HttpMethod.GET,
        url: EndPoint.worry.get.WORRY_REPLIES,
        query: {
          worryId: postId,
        },
      })?.then((res) => {
        console.log(res.data);
        setChatData(res?.data);
        setChatText("");
      });
    } catch (e) {
      console.log(e);
    }
  }

  // 댓글 조회 api 필요
  useEffect(() => {
    if (openBottomSheet) {
      console.log(postId);
      // 댓글 조회 api
      getChatData();
    }
  }, [openBottomSheet]);
  useEffect(() => {
    console.log("모바일 브라우저 상태에서는 하단에 더 값 줘야함.");
  }, []);

  const [chatData, setChatData] = useState([]);
  const [chatText, setChatText] = useState("");

  const handleChat = async () => {
    try {
      const res = await ApiConfig.request({
        method: HttpMethod.POST,
        url: EndPoint.worry.post.WORRY_REPLY,
        data: {
          content: chatText,
          userId: userInfo.userId,
          worryId: postId,
        },
      });
      // console.log(res);
      getChatData();

    } catch (e) {
      console.log(e);
    }
  };

  const handlePushChat = () =>{
    debouncedHandlePushChat();
  }
  const debouncedHandlePushChat = debounce(handleChat, 1000);

  return (
    <PostChatWrap>
      <PostChatContainer>
        <PostProfileBox nickname={"닉넹미"} />
        <h1>{postData.title}</h1>
        <h2>{formatText(postData.content)}</h2>
        <div className={"toolbar"}>
          <img
            src={ShareIcon}
            alt={"공유"}
            onClick={() => handleClickShare(postId)}
          />
          <p className={"result"}>
            현재 투표한 사용자 {postData.userWorryChoiceCount}명
          </p>
        </div>
      </PostChatContainer>
      <GrayBar />
      <PostChatContainer>
        <InputWrap>
          <input
            className={"댓글입력"}
            placeholder={"여러분들의 의견을 자유롭게 남겨주세요!"}
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
          />
          <img src={SendIcon} alt={"전송"} onClick={() => handlePushChat()} />
        </InputWrap>
        <ChatContentWrap>
          {" "}
          {chatData &&
            chatData.map((chat: any, idx) => {
              return (
                <UserChatBox key={idx}>
                  <div className={"metaData"}>
                    <div>
                      <PostProfileBox
                        nickname={chat.user.nickname}
                        profileImg={chat.user.profileImageUrl}
                      />
                      {/* 유저 투표값에 따른 이모지 제공 필요*/}
                    </div>
                    <div className={"uploadDate"}>
                      {formatDate(chat.createdAt)}
                    </div>
                  </div>
                  <p>{chat.content}</p>
                </UserChatBox>
              );
            })}
        </ChatContentWrap>

        {/*<div className={"공간확보용"} style={{ height: "5rem" }} />*/}
      </PostChatContainer>
    </PostChatWrap>
  );
}

const PostChatWrap = styled.div`
  margin-bottom: 30vh;
`;
const ChatContentWrap = styled.div``;

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

const PostChatContainer = styled.div`
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
    line-height: 2.1rem;
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
