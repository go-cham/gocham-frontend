import { useState } from 'react';

import ThumbnailLoading from '@/images/Common/thumbnailLoading.svg';
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
  const [imageLoading, setImageLoading] = useState(true);
  const handleImageLoad = () => {
    setImageLoading(false);
  };
  return (
    <div className="relative flex h-[6.4rem] items-center">
      <div className="flex-1 space-y-[0.7rem] overflow-hidden">
        <h1 className="truncate align-middle font-system-heading2">{title}</h1>
        <p className="h-[1.6rem] truncate align-middle text-text-explain-500 font-system-body1">
          {formatText(content)}
        </p>
      </div>
      {image &&
        (!imageLoading ? (
          <img
            src={image}
            alt={'게시글 이미지'}
            className="ml-[1.7rem] aspect-square w-[6.4rem] rounded-[5px] border border-background-dividerLine-300 object-cover"
          />
        ) : (
          <img
            src={ThumbnailLoading}
            alt={'게시글 이미지 로딩'}
            onLoad={handleImageLoad}
            className="ml-[1.7rem] aspect-square w-[6.4rem] rounded-[5px] border border-background-dividerLine-300 object-cover"
          />
        ))}
    </div>
  );
}
