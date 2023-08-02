interface ImageListProps {
  images: string[];
}

export default function ImageList({ images }: ImageListProps) {
  return (
    <div className="flex space-x-[1.3rem] px-[2.5rem]">
      {images.map((image) => (
        <img
          key={image}
          src={image}
          alt={'업로드 이미지'}
          className="h-[7.1rem] w-[7.1rem] rounded-[0.5rem] object-cover"
        />
      ))}
    </div>
  );
}
