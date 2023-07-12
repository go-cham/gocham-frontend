import { ChangeEvent, useRef, useState } from 'react';

import DeleteIcon from '@/components/icons/DeleteIcon';
import ImageFileIcon from '@/components/icons/ImageFileIcon';
import { twMergeCustom } from '@/libs/tw-merge';

interface PostVoteInputProps {
  image?: string;
  onUploadImage?: () => void;
  onDeleteImage?: () => void;
  onChange?: (item: string) => void;
  className?: string;
  hasError?: boolean;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
  defaultValue?: string;
}

export default function PostVoteInput({
  image,
  onUploadImage,
  onDeleteImage,
  onChange,
  className,
  hasError,
  placeholder = '항목 입력',
  maxLength = 15,
  readOnly,
  defaultValue,
}: PostVoteInputProps) {
  const [item, setItem] = useState(defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newItem = e.target.value;
    setItem(newItem);
    onChange && onChange(newItem);
  };

  const handleReset = () => {
    setItem('');
    onChange && onChange('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={twMergeCustom(
        'group relative w-[34rem] rounded-[0.5rem]',
        className,
        readOnly && 'pointer-events-none bg-custom-background-100'
      )}
    >
      <input
        ref={inputRef}
        type="text"
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={handleChange}
        value={item}
        readOnly={readOnly}
        className={twMergeCustom(
          'w-full rounded-[0.5rem] border border-custom-background-200 bg-transparent py-[1.2rem] pl-[1.3rem] text-body4 placeholder:text-body3 placeholder:text-custom-gray-400 group-focus-within:border-custom-gray-800',
          hasError &&
            'border-custom-semantic-warn-500 group-focus-within:border-custom-semantic-warn-500',
          readOnly && 'text-custom-text-500'
        )}
      />
      <div className="absolute right-[1.2rem] top-1/2 flex -translate-y-1/2 space-x-[0.8rem]">
        {item && (
          <button
            onClick={handleReset}
            className="hidden group-focus-within:block"
          >
            <DeleteIcon
              className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full bg-custom-gray-300"
              color="white"
            />
          </button>
        )}
        {image && (
          <div className="h-[4rem] w-[4rem]">
            <img
              src={image}
              alt="투표 이미지"
              className="h-full w-full object-cover"
            />
            <button onClick={onDeleteImage}>
              <DeleteIcon
                className="absolute right-0 top-0 h-[1.6rem] w-[1.6rem] bg-[#676a72]"
                color="white"
              />
            </button>
          </div>
        )}
        {!image && onUploadImage && (
          <button onClick={onUploadImage}>
            <ImageFileIcon />
          </button>
        )}
      </div>
    </div>
  );
}
