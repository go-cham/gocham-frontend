interface PostCardMetaProps {
  numComment: number;
  numVotes: number;
  onClickComment: () => void;
}

export default function PostCardMeta({
  numComment,
  numVotes,
  onClickComment,
}: PostCardMetaProps) {
  return (
    <div className="flex items-end justify-between">
      <span
        className="cursor-pointer text-[1.2rem] font-medium text-text2"
        onClick={onClickComment}
      >
        댓글 {numComment}개 모두 보기
      </span>
      <span className="text-[1rem] font-medium text-text3">
        현재 투표한 사용자 {numVotes}명
      </span>
    </div>
  );
}
