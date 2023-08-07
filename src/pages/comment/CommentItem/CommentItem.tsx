import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import useGetMyChoice from '@/apis/hooks/posts/useGetMyChoice';
import useUser from '@/apis/hooks/users/useUser';
import CommentContent from '@/pages/comment/CommentItem/CommentContent';
import CommentFooter from '@/pages/comment/CommentItem/CommentFooter';
import CommentHeader from '@/pages/comment/CommentItem/CommentHeader';
import { commentStateAtom } from '@/states/comment';

interface CommentItemProps {
  user: {
    id: number;
    nickname: string;
    age: number;
    choiceLabel: string | null;
  };
  mentionNickname?: string;
  isWriter: boolean;
  content: string;
  createdAt: string;
  commentId: number;
  parentCommentId?: number;
}

export default function CommentItem({
  user,
  mentionNickname,
  isWriter,
  content,
  createdAt,
  commentId,
  parentCommentId,
}: CommentItemProps) {
  const [commentState, setCommentState] = useAtom(commentStateAtom);
  const { choice } = useGetMyChoice({
    userId: user.id,
    postId: user.choiceLabel ? undefined : commentState.postId || undefined,
  });
  const navigate = useNavigate();
  const { user: currentUser } = useUser();

  const handleReply = () => {
    setCommentState({
      ...commentState,
      replyingTo: {
        id: user.id,
        nickname: user.nickname,
        commentId,
      },
      parentCommentId: parentCommentId || commentId || null,
    });

    const el = document.getElementById('comment-input');
    if (el) {
      el.innerHTML = '';
      const tagEl = document.createElement('span');
      tagEl.style.display = 'inline';
      const text = document.createTextNode(`@${user.nickname}\u00A0`);
      tagEl.appendChild(text);
      tagEl.contentEditable = 'false';
      tagEl.className = 'text-mainSub-main-500';
      el.appendChild(tagEl);
      el.appendChild(document.createTextNode(''));

      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const handleReport = () => {
    navigate(`/comment/${commentId}/report`, {
      state: {
        content: content,
        nickName: user.nickname,
        postId: commentState.postId,
      },
    });
  };

  return (
    <div
      id={`comment-${commentId}`}
      className="flex flex-col px-[1.5rem] pb-[1.5rem] pt-[1.7rem]"
    >
      <CommentHeader
        nickname={user.nickname}
        age={user.age}
        choice={user.choiceLabel || choice?.label || null}
        isWriter={isWriter}
        isMyComment={user.id === currentUser?.id}
        commentId={commentId}
        onReport={handleReport}
      />
      <CommentContent mentionNickname={mentionNickname} content={content} />
      <CommentFooter createdAt={createdAt} onReply={handleReply} />
    </div>
  );
}
