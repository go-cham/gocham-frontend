import { MouseEvent } from 'react';

interface PostCardMetaProps {
  numComment: number;
  numVotes: number;
  onCommentShow: (e: MouseEvent) => void;
}

export default function PostCardMeta({
  numComment,
  numVotes,
  onCommentShow,
}: PostCardMetaProps) {
  return (
    <div className="flex items-end justify-between">
      <span
        className="cursor-pointer text-text-explain-500 font-system-body2"
        onClick={onCommentShow}
      >
        댓글 {numComment < 100 ? numComment : '99+'}개 모두 보기
      </span>
      <span className="text-text-explain-500 font-system-caption">
        현재 투표한 사용자 {numVotes}명
      </span>
    </div>
  );
}
