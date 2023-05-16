import React, { useEffect, useRef, useState } from "react";
import PostProfileBox from "../post/PostProfileBox";
import styled from "@emotion/styled";
import palette from "../../style/color";
import ChatIcon from "../../images/PostComponent/chat.svg";
import ShareIcon from "../../images/PostComponent/share.svg";
import SendIcon from "../../images/PostComponent/send.svg";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import { userDataAtomType } from "../../atom/userData";
import { formatDate } from "../../utils/formatDate";
import { formatText } from "../../utils/formatText";
import { debounce } from "lodash";
import { useAtom } from "jotai/index";
import { refreshChatAtom } from "../../atom/postRefreshRequest";
import { chatInputFocusAtom } from "../../atom/chatInputFocus";

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
  const chatRef = useRef<HTMLInputElement>(null);
  const [chatInputFocus, setChatInputFocus] = useAtom(chatInputFocusAtom);

  function getChatData() {
    try {
      ApiConfig.request({
        method: HttpMethod.GET,
        url: EndPoint.worry.get.WORRY_REPLIES,
        query: {
          worryId: postId,
        },
      })?.then((res) => {
        setChatData(res?.data);
      });
    } catch (e) {
      console.log(e);
    }
  }

  // 댓글 조회 api 필요
  useEffect(() => {
    if (openBottomSheet) {
      // 댓글 조회 api
      getChatData();
    }
  }, [openBottomSheet]);

  const [chatData, setChatData] = useState([]);
  const [chatText, setChatText] = useState("");
  const [needRefresh, setNeedRefresh] = useAtom(refreshChatAtom);

  useEffect(() => {
    if (chatInputFocus.worryId === postId) {
      chatRef.current?.focus();
    }
  }, [chatInputFocus]);

  const handleChatPost = async () => {
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
      setNeedRefresh({
        worryIdx: postId,
        updateObject: "chat",
      });
      setChatText("");
      getChatData();
    } catch (e) {
      console.log(e);
    }
  };

  const handlePushChat = () => {
    debouncedHandlePushChat();
  };
  const debouncedHandlePushChat = debounce(handleChatPost, 1000);

  // 엔터 입력시
  const handleOnKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePushChat(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <PostChatWrap>
      <PostChatContainer>
        <PostProfileBox
          nickname={postData.user?.nickname ? postData.user?.nickname : "익명"}
          profileImg={postData.user?.profileImageUrl}
        />
        <h1>{postData.title}</h1>
        <h2>{formatText(postData.content)}</h2>
        <div className={"toolbar"}>
          <p className={"result"}>
            현재 투표한 사용자 {postData.userWorryChoiceCount}명
          </p>
        </div>
      </PostChatContainer>
      <GrayBar />
      <PostChatContainer>
        <InputWrap>
          <input
            ref={chatRef}
            className={"댓글입력"}
            placeholder={"여러분들의 의견을 자유롭게 남겨주세요!"}
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            onKeyDown={handleOnKeyPress} // Enter 입력 이벤트 함수
            maxLength={200}
          />
          <img src={SendIcon} alt={"전송"} onClick={() => handlePushChat()} />
        </InputWrap>
        <ChatContentWrap>
          {chatData &&
            chatData.map((chat: any, idx) => {
              return (
                <UserChatBox key={idx}>
                  <div className={"metaData"}>
                    <div className={"userAttribute"}>
                      <PostProfileBox
                        nickname={chat.user.nickname}
                        profileImg={chat.user.profileImageUrl}
                      />
                      {chat.user.worryChoice?.label && (
                        <div className={"worryLabel"}>
                          {chat.user.worryChoice.label}
                        </div>
                      )}

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
      </PostChatContainer>
    </PostChatWrap>
  );
}

const PostChatWrap = styled.div`
  margin-bottom: 10rem;
`;
const ChatContentWrap = styled.div``;

const UserChatBox = styled.div`
  margin-top: 2.1rem;

  & .userAttribute {
    display: flex;
    align-items: center;
    & .worryLabel {
      margin-left: 0.7rem;
      padding: 0 1rem;
      height: 2.2rem;
      border-radius: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-size: 1rem;
      color: black;
      border: 1px solid black;
      background-color: white;
    }
  }
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
    word-wrap: break-word;
  }
`;

const InputWrap = styled.div`
  margin-top: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .댓글입력 {
    width: 88%;
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
    justify-content: end;
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
  width: 100%;
  height: 0.1rem;
`;
