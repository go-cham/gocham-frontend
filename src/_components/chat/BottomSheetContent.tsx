import { useAtom } from 'jotai';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { chatInputFocusAtom } from '@/atom/chatInputFocus';
import { refreshChatAtom } from '@/atom/postRefreshRequest';
import { userDataAtomType } from '@/atom/userData';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import SendIcon from '@/images/PostComponent/send.svg';
import { formatDate } from '@/utils/formatDate';
import { formatText } from '@/utils/formatText';

import PostUserProfile from '../post/PostUserProfile';

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
  const [chatText, setChatText] = useState('');
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
        updateObject: 'chat',
      });
      setChatText('');
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
    if (e.key === 'Enter') {
      handlePushChat(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <div className="divide-y-[1px] divide-gray3 pb-[10rem]">
      <div className="px-[1.9rem]">
        <PostUserProfile
          nickname={postData.user?.nickname ? postData.user?.nickname : '익명'}
          profileImage={postData.user?.profileImageUrl}
        />
        <h1 className="mt-[2.1rem] text-[1.8rem] font-bold">
          {postData.title}
        </h1>
        <p className="mt-[1.3rem] text-[1.4rem]">
          {formatText(postData.content)}
        </p>
        <div className="mb-[1.3rem] mt-[1.7rem] text-end">
          <span className="text-[1.2rem] text-text3">
            현재 투표한 사용자 {postData.userWorryChoiceCount}명
          </span>
        </div>
      </div>
      <div className="px-[1.9rem]">
        <div className="mt-[1.7rem] flex items-center justify-between">
          <input
            ref={chatRef}
            className="h-[4.1rem] w-[88%] rounded-[0.5rem] border border-gray2 px-[1rem] text-[1.4rem] placeholder-text4"
            placeholder={'여러분들의 의견을 자유롭게 남겨주세요!'}
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            onKeyDown={handleOnKeyPress} // Enter 입력 이벤트 함수
            maxLength={200}
          />
          <img src={SendIcon} alt={'전송'} onClick={handlePushChat} />
        </div>
        <div>
          {chatData &&
            chatData.map((chat: any, idx) => {
              return (
                <div key={idx} className="mt-[2.1rem]">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <PostUserProfile
                        nickname={chat.user.nickname}
                        profileImage={chat.user.profileImageUrl}
                      />
                      {chat.user.worryChoice?.label && (
                        <span className="ml-[0.7rem] flex h-[2.2rem] items-center justify-center rounded-[1.5rem] border px-[1rem] text-[1rem] font-medium">
                          {chat.user.worryChoice.label}
                        </span>
                      )}
                      {/* 유저 투표값에 따른 이모지 제공 필요*/}
                    </div>
                    <div className="text-[1.2rem]">
                      {formatDate(chat.createdAt)}
                    </div>
                  </div>
                  <p className="mt-[0.9rem] break-all px-[3.3rem] text-[1.4rem]">
                    {chat.content}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
