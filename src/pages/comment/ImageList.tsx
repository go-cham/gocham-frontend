interface ImageListProps {
  images: string[];
  onClick: (index: number) => void;
}

export default function ImageList({ images, onClick }: ImageListProps) {
  return (
    <div className="flex space-x-[1.3rem] px-[2.5rem]">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={'업로드 이미지'}
          className="h-[7.1rem] w-[7.1rem] cursor-pointer rounded-[0.5rem] object-cover"
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}
