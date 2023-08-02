import { useAtomValue } from 'jotai';
import { KeyboardEvent, useEffect, useState } from 'react';

import useAddComment from '@/apis/hooks/posts/useAddComment';
import useUser from '@/apis/hooks/users/useUser';
import AddCommentIcon from '@/components/icons/AddCommentIcon';
import { commentStateAtom } from '@/states/comment';

export default function CommentInput() {
  const { user } = useUser();
  const commentState = useAtomValue(commentStateAtom);
  const { addComment, isSuccess } = useAddComment();
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = () => {
    submit();
  };

  const handleInput = () => {
    const el = document.getElementById('comment-input');

    if (el) {
      setIsActive(!!el.textContent?.trimEnd());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      console.log('keydown');
      e.preventDefault();
      submit();
    }
  };

  const submit = () => {
    const el = document.getElementById('comment-input');
    if (el && user) {
      const rawContent = el.textContent as string;

      const regex = /^@([A-Za-z가-힣0-9]+)\s((.|\n)*)/;
      const matches = rawContent.match(regex);

      let content = '';
      let nickname = '';
      if (matches) {
        nickname = matches[1].trimEnd();
        content = matches[2].trimEnd();
      } else {
        content = rawContent.trimEnd();
      }

      const isReply =
        nickname && nickname === commentState.replyingTo?.nickname;

      if (commentState.postId && content) {
        addComment({
          userId: user.id,
          content,
          worryId: commentState.postId,
          mentionUserId: isReply ? commentState.replyingTo?.id || null : null,
          nestingReplyId: isReply ? commentState.parentCommentId : null,
        });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const el = document.getElementById('comment-input');
      if (el) {
        el.innerHTML = '';
        el.focus();
        setIsActive(false);
      }
    }
  }, [isSuccess]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="shadow-dock flex w-full items-center space-x-[1.3rem] bg-white px-[1.5rem] pb-[1.1rem] pt-[1.5rem]"
    >
      <div
        id="comment-input"
        contentEditable={true}
        className="hide-scrollbar h-[4.4rem] flex-1 overflow-y-scroll whitespace-pre rounded-[0.5rem] border px-[1.3rem] pt-[0.9rem] outline-none focus:border-text-explain-500"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      ></div>
      <button
        onClick={handleSubmit}
        className={`h-[3.6rem] w-[3.6rem] rounded-full ${
          isActive ? 'bg-mainSub-main-500' : 'bg-background-button-300'
        }`}
      >
        <AddCommentIcon />
      </button>
    </form>
  );
}
