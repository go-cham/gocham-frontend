import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@/components/icons/DeleteIcon';

interface ImageFullScreenProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageFullScreen({
  images,
  initialIndex,
  onClose,
}: ImageFullScreenProps) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const handlePopState = () => {
      history.go(1);
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      handlePopState();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[100] h-[100dvh] w-screen bg-text-title-900">
      <div className="absolute top-[1rem] z-[100] flex w-full items-center justify-between px-[1.3rem]">
        <DeleteIcon className="invisible" onClick={onClose} />
        <span
          className={`text-background-button-300 font-custom-heading2 ${
            images.length > 1 ? 'visible' : 'invisible'
          }`}
        >
          {`${index + 1}/${images.length}`}
        </span>
        <DeleteIcon
          color="white"
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <Carousel
        showThumbs={false}
        showIndicators={false}
        selectedItem={initialIndex}
        showArrows={false}
        showStatus={false}
        onChange={(index) => setIndex(index)}
        emulateTouch={true}
      >
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt="확대 이미지"
            className="h-[100dvh] w-screen object-contain"
          />
        ))}
      </Carousel>
    </div>
  );
}
