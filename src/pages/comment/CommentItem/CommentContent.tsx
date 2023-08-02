import { formatText } from '@/utils/formatText';

interface CommentContentProps {
  mentionNickname?: string;
  content: string;
}

export default function CommentContent({
  mentionNickname,
  content,
}: CommentContentProps) {
  return (
    <p className="mb-[0.7rem] ml-[3rem] mt-[1rem] break-words text-text-subTitle-700 font-system-body4">
      {mentionNickname ? (
        <span className="mr-[0.5rem] text-mainSub-main-500">
          @{mentionNickname}
        </span>
      ) : null}
      {formatText(content)}
    </p>
  );
}
