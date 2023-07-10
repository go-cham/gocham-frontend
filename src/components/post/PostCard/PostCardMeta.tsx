import { MouseEvent } from 'react';

interface PostCardMetaProps {
  numComment: number;
  numVotes: number;
  onClickComment: (e: MouseEvent) => void;
}

export default function PostCardMeta({
  numComment,
  numVotes,
  onClickComment,
}: PostCardMetaProps) {
  return (
    <div className="flex items-end justify-between">
      <span
        className="cursor-pointer text-body1 text-custom-text-500"
        onClick={onClickComment}
      >
        댓글 {numComment}개 모두 보기
      </span>
      <span className="text-caption text-custom-text-400">
        현재 투표한 사용자 {numVotes}명
      </span>
    </div>
  );
}
