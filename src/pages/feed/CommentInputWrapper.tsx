import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import useAddComment from '@/apis/hooks/posts/useAddComment';
import AddCommentIcon from '@/components/icons/AddCommentIcon';

interface addCommentI {
  addChildComment: {
    addChild: boolean;
    nestingReplyId: number;
    nickName: string;
  };
  setAddChildComment: React.Dispatch<
    React.SetStateAction<{
      addChild: boolean;
      nestingReplyId: number;
      nickName: string;
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
  const commentInputted = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!content.includes(`@${addChildComment.nickName}`)) {
      setAddChildComment({ addChild: false, nestingReplyId: -1, nickName: '' });
    }
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
      });
    } else {
      addComment({ content, userId, worryId, nestingReplyId: null });
    }
  };
  useEffect(() => {
    if (addChildComment.addChild)
      setContent((prev) => `@${addChildComment.nickName} ${prev}`);
    commentInputRef.current?.focus();
  }, [addChildComment]);

  return (
    <div
      className={`${
        isMobile ? 'fixed' : 'absolute'
      } bottom-0 flex w-full items-center justify-around border-t border-background-dividerLine-300 bg-white px-4 pb-10 pt-4 shadow-lg`}
    >
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
          content.trim() !== '' ? 'bg-custom-main-500' : 'bg-gray-300'
        }`}
      >
        <AddCommentIcon />
      </div>
    </div>
  );
}
