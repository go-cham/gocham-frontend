import DeleteIcon from '@/common/assets/images/write/delete-icon.svg';

interface ImagePreviewProps {
  images: string[];
  onDelete: (index: number) => () => void;
}

export function ImagePreview({ images, onDelete }: ImagePreviewProps) {
  return (
    <div className="mt-[1.3rem] flex w-full space-x-[2.1rem]">
      {images.map((image, index) => (
        <div key={image} className="relative h-[7.1rem] w-[7.1rem]">
          <img
            src={image}
            alt={'업로드 이미지'}
            className="h-full w-full object-cover"
          />
          <img
            src={DeleteIcon}
            alt={'삭제 버튼'}
            onClick={onDelete(index)}
            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}
