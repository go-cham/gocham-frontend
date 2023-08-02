import commentTime from '@/utils/date/commentTime';

interface CommentFooterProps {
  createdAt: string;
  onReply: () => void;
}

export default function CommentFooter({
  createdAt,
  onReply,
}: CommentFooterProps) {
  return (
    <div className="text-custom-text-500 ml-[3rem] flex justify-between text-body2">
      <span
        className="cursor-pointer text-text-explain-500 font-system-body2"
        onClick={onReply}
      >
        답글달기
      </span>
      <span className="text-text-explain-500 font-system-body1">
        {commentTime(createdAt)}
      </span>
    </div>
  );
}
