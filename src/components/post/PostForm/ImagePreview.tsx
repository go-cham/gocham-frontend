import DeleteIcon from '@/images/Write/delete_icon.svg';

interface ImagePreviewProps {
  images: { id?: number; url: string }[];
  onDelete: (index: number) => () => void;
}

export default function ImagePreview({ images, onDelete }: ImagePreviewProps) {
  return (
    <div className="mt-[1.3rem] flex w-full space-x-[2.1rem]">
      {images.map((image, index) => (
        <div
          key={image.id + image.url}
          className="relative h-[7.1rem] w-[7.1rem]"
        >
          <img
            src={image.url}
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
