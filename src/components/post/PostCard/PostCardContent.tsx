import { formatText } from '@/utils/formatText';

interface PostCardContentProps {
  title: string;
  content: string;
  image: string | null;
}

export default function PostCardContent({
  title,
  content,
  image,
}: PostCardContentProps) {
  return (
    <div className="relative -top-[0.4rem] flex h-[6.4rem] items-center">
      <div className="flex-1 space-y-[0.9rem] overflow-hidden">
        <h1 className="truncate align-middle text-heading3">{title}</h1>
        <p className="h-[1.6rem] truncate align-middle text-body1 text-text-explain-500">
          {formatText(content)}
        </p>
      </div>
      {image && (
        <img
          src={image}
          alt={'게시글 이미지'}
          className="ml-[1.7rem] aspect-square w-[6.4rem] rounded-[5px] border border-background-dividerLine-300 object-cover"
        />
      )}
    </div>
  );
}
