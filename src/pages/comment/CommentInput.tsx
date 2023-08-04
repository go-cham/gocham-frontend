import { useAtom } from 'jotai';
import { KeyboardEvent, useEffect } from 'react';

import AddCommentIcon from '@/components/icons/AddCommentIcon';
import { commentStateAtom } from '@/states/comment';

interface CommentInputProps {
  onSubmit: () => void;
}

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const [commentState, setCommentState] = useAtom(commentStateAtom);

  const handleInput = () => {
    const el = document.getElementById('comment-input');

    if (el) {
      setCommentState({
        ...commentState,
        inputActive: !!el.textContent?.trimEnd(),
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (commentState.replyingTo?.commentId) {
        const comment = document.getElementById(
          `comment-${commentState.replyingTo.commentId}`
        );
        const input = document.getElementById('comment-input-wrapper');
        if (comment && input) {
          const commentBottom = comment.getBoundingClientRect().bottom;
          const inputTop = input.getBoundingClientRect().top;

          if (commentBottom > inputTop) {
            const page = document.getElementById('comment-page');
            if (page) {
              page.scrollBy({
                top: commentBottom - inputTop,
              });
            }
          }
        }
      }
    }, 200);
  }, [commentState.replyingTo?.commentId]);

  return (
    <form
      id="comment-input-wrapper"
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
        onClick={onSubmit}
        className={`h-[3.6rem] w-[3.6rem] rounded-full ${
          commentState.inputActive
            ? 'bg-mainSub-main-500'
            : 'bg-background-button-300'
        }`}
      >
        <AddCommentIcon />
      </button>
    </form>
  );
}
