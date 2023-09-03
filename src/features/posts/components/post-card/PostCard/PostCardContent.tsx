import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactComponent as ThumbnailPlaceholder } from '@/common/assets/images/thumbnail-placeholder.svg';
import { resizeImage } from '@/common/libs/cloudinary';
import { formatText } from '@/common/utils/formatText';

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
    <div className="relative flex h-[6.4rem] items-center">
      <div className="flex-1 space-y-[0.7rem] overflow-hidden">
        <h1 className="truncate align-middle font-system-heading2">{title}</h1>
        <p className="h-[1.6rem] truncate align-middle text-text-explain-500 font-system-body1">
          {formatText(content)}
        </p>
      </div>
      {image && (
        <LazyLoadImage
          src={resizeImage(image, 200)}
          alt={'게시글 이미지'}
          className="ml-[1.7rem] aspect-square w-[6.4rem] rounded-[5px] border border-background-dividerLine-300 object-cover"
          placeholder={<ThumbnailPlaceholder />}
          threshold={300}
        />
      )}
    </div>
  );
}
