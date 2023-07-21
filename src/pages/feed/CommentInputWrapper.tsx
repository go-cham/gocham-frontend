import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import useAddComment from '@/apis/hooks/posts/useAddComment';
import AddCommentIcon from '@/components/icons/AddCommentIcon';

interface addCommentI {
  addChildComment: {
    addChild: boolean;
    nestingReplyId: number;
    nickName: string;
    mentionUserId: number;
  };
  setAddChildComment: React.Dispatch<
    React.SetStateAction<{
      addChild: boolean;
      nestingReplyId: number;
      nickName: string;
      mentionUserId: number;
    }>
  >;
  userId: number;
  worryId: number;
}

export default function CommentInputWrapper({
  setAddChildComment,
  addChildComment,
  userId,
  worryId,
}: addCommentI) {
  const [content, setContent] = useState('');
  const [spaceLength, setSpaceLength] = useState(0);
  const commentInputted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { addComment } = useAddComment();
  const addCommentClicked = () => {
    setContent('');
    if (addChildComment.addChild) {
      addComment({
        content,
        userId,
        worryId,
        nestingReplyId: addChildComment.nestingReplyId,
        mentionUserId: addChildComment.mentionUserId,
      });
      setAddChildComment({
        addChild: false,
        nestingReplyId: -1,
        nickName: '',
        mentionUserId: -1,
      });
    } else {
      addComment({
        content,
        userId,
        worryId,
        nestingReplyId: null,
        mentionUserId: null,
      });
    }
  };
  useEffect(() => {
    setContent((prev) => {
      return prev.trim();
    });
    let koreanCount = 0;
    let englishCount = 0;
    let numberCount = 0;
    if (addChildComment.addChild) {
      for (const char of addChildComment.nickName) {
        if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(char)) {
          koreanCount++;
        } else if (/[A-Za-z]/.test(char)) {
          englishCount++;
        } else if (/[0-9]/.test(char)) {
          numberCount++;
        }
      }
      setSpaceLength(3 + koreanCount * 4 + englishCount * 2 + numberCount * 3);
      setContent(
        (prev) =>
          ' '.repeat(3 + koreanCount * 4 + englishCount * 2 + numberCount * 3) +
          prev
      );
    }
    commentInputRef.current?.focus();
  }, [addChildComment]);
  useEffect(() => {
    const leadingSpaces = content.match(/^\s*/)?.[0];
    if (leadingSpaces && leadingSpaces.length + 1 < spaceLength) {
      setContent('');
      setAddChildComment({
        addChild: false,
        nestingReplyId: -1,
        nickName: '',
        mentionUserId: -1,
      });
      return;
    }
  }, [content]);
  return (
    <div
      className={`${
        isMobile ? 'fixed' : 'absolute'
      } bottom-0 flex w-full items-center justify-around border-t border-background-dividerLine-300 bg-white px-4 pb-10 pt-4 shadow-lg`}
    >
      {addChildComment.addChild ? (
        <div
          className={`${
            isMobile ? 'fixed' : 'absolute'
          } left-[2.5rem] text-[1.4rem] text-mainSub-main-500`}
        >
          @{addChildComment.nickName}
        </div>
      ) : null}
      <input
        ref={commentInputRef}
        className="font-red w-5/6 rounded-lg border border-gray-300 py-4 pl-4 text-[1.4rem] focus:border-black"
        placeholder="의견을 자유롭게 작성해 주세요."
        onChange={commentInputted}
        value={content}
      />
      <div
        onClick={addCommentClicked}
        className={`flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-full ${
          content.trim() !== '' ? 'bg-mainSub-main-500' : 'bg-gray-300'
        }`}
      >
        <AddCommentIcon />
      </div>
    </div>
  );
}
