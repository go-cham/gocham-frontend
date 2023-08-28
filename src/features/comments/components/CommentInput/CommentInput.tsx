import { useAtom } from 'jotai';
import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useState,
} from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from 'react-router-dom';
import AddCommentIcon from '@/common/components/icons/AddCommentIcon';
import { commentStateAtom } from '@/features/comments/states/comment';

interface CommentInputProps {
  onSubmit: () => void;
}

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const [commentState, setCommentState] = useAtom(commentStateAtom);
  const location = useLocation();
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = () => {
    const el = document.getElementById('comment-input');

    if (el) {
      const content =
        el.childNodes[el.childNodes.length - 1]?.textContent || '';

      if (content.length > 280) {
        el.textContent = content.slice(0, -1);
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }

      setCommentState({
        ...commentState,
        inputActive: !!el.textContent?.trimEnd(),
      });
    }
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
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
          `comment-${commentState.replyingTo.commentId}`,
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

  useEffect(() => {
    const el = document.getElementById('comment-input');
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && el) {
        const content = el.childNodes[el.childNodes.length - 1]?.textContent;
        if (!content) {
          el.innerHTML = '';
          e.preventDefault();
        }
      }
    };

    if (el) {
      el.addEventListener('keydown', handleKeydown);
    }
    return () => {
      el?.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (location.state?.focus) {
      const el = document.getElementById('comment-input');
      el?.focus();
    }
  }, [location]);

  return (
    <form
      id="comment-input-wrapper"
      onSubmit={(e) => e.preventDefault()}
      className={`shadow-dock flex w-full touch-none items-center space-x-[1.3rem] bg-white px-[1.5rem] pt-[1.5rem] ${
        isMobile && isFocused ? 'pb-[1.1rem]' : 'pb-[5.1rem]'
      }`}
    >
      <div
        id="comment-input"
        contentEditable={true}
        className="hide-scrollbar h-[4.4rem] flex-1 touch-auto overflow-y-scroll whitespace-pre rounded-[0.5rem] border px-[1.3rem] pt-[0.9rem] outline-none focus:border-text-explain-500"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() =>
          setTimeout(() => {
            setIsFocused(false);
          }, 10)
        }
      ></div>
      <button
        onClick={onSubmit}
        className={`h-[3.6rem] w-[3.6rem] touch-auto rounded-full ${
          commentState.inputActive
            ? 'bg-mainSub-main-500'
            : 'pointer-events-none bg-background-button-300'
        }`}
      >
        <AddCommentIcon />
      </button>
    </form>
  );
}
