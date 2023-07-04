import { formatText } from '@/utils/formatText';

interface PostCardContentProps {
  title: string;
  content: string;
  image: string | null;
  onClick: () => void;
}

export default function PostCardContent({
  title,
  content,
  image,
  onClick,
}: PostCardContentProps) {
  return (
    <div
      className="relative -top-[0.4rem] flex h-[6.4rem] cursor-pointer items-center"
      onClick={onClick}
    >
      <div className="flex-1 space-y-[0.9rem] overflow-hidden">
        <h1 className="truncate align-middle text-heading3">{title}</h1>
        <p className="h-[1.6rem] truncate align-middle text-body1 text-custom-text-500">
          {formatText(content)}
        </p>
      </div>
      {image && (
        <img
          src={image}
          alt={'게시글 이미지'}
          className="ml-[1.7rem] aspect-square w-[6.4rem] rounded-[5px] border border-custom-background-200 object-cover"
        />
      )}
    </div>
  );
}
