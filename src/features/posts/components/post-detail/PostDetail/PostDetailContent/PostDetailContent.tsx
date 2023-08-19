import { useEffect, useRef, useState } from 'react';
import { ImageFullScreen } from '@/common/components/ui';
import { formatText } from '@/common/utils/formatText';

export function PostDetailContent({
  title,
  content,
  images,
}: {
  title: string;
  content: string;
  images?: string[] | null;
}) {
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const multipleImagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!multipleImagesRef.current) return;

    const allImages =
      multipleImagesRef.current?.querySelectorAll<HTMLImageElement>('img');
    Promise.all(
      Array.from(allImages)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            }),
        ),
    ).then(() => {
      if (multipleImagesRef.current) {
        multipleImagesRef.current.scrollTo({
          left: 0,
        });
        multipleImagesRef.current.style.opacity = '1';
      }
    });
  }, []);

  return (
    <div>
      {zoomedImageIndex !== null && images && (
        <ImageFullScreen
          images={images}
          initialIndex={zoomedImageIndex}
          onClose={() => setZoomedImageIndex(null)}
        />
      )}
      <div className="px-[2.5rem]">
        <h1 className="mt-[1.3rem] font-system-heading1">{title}</h1>
        <p className="mt-[0.8rem] break-words text-text-subTitle-700 font-system-body3">
          {formatText(content)}
        </p>
      </div>
      <div className="mt-[1.7rem]">
        {images && images.length === 1 && (
          <img
            src={images[0]}
            alt={'게시글이미지'}
            className="mx-auto h-[29.3rem] w-[36rem] rounded-[0.5rem] object-cover"
          />
        )}
        {images && images.length > 1 && (
          <div
            ref={multipleImagesRef}
            className="flex space-x-[1.3rem] overflow-x-auto px-[1.5rem] opacity-0"
            style={{
              scrollSnapType: 'x mandatory',
            }}
          >
            {images.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={'게시글이미지'}
                className="h-[29.3rem] max-w-[29.3rem] cursor-pointer rounded-[0.5rem] object-cover"
                style={{
                  scrollSnapAlign: 'center',
                }}
                onClick={() => setZoomedImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
