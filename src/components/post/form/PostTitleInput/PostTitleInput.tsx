import { ChangeEvent, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import DeleteIcon from '@/components/icons/DeleteIcon';
import ImageFileIcon from '@/components/icons/ImageFileIcon';
import InputWrapper from '@/components/ui/inputs/InputWrapper';

interface PostTitleInputProps {
  errorMessage?: string | null;
  onUploadImage?: () => void;
  onChange?: (title: string) => void;
  className?: string;
}

export default function PostTitleInput({
  errorMessage,
  onUploadImage,
  onChange,
  className,
}: PostTitleInputProps) {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onChange && onChange(newTitle);
  };

  const handleReset = () => {
    setTitle('');
    inputRef.current?.focus();
  };

  return (
    <InputWrapper
      label="글 제목"
      subLabel="사진 최대 3장 첨부 가능"
      errorMessage={errorMessage}
      className={className}
      labelClassName="text-subheading"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="제목 입력"
        maxLength={30}
        className="w-full bg-transparent text-body4 placeholder:text-body3 placeholder:text-custom-text-400"
        onChange={handleTitleChange}
        value={title}
      />
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center space-x-[0.8rem]">
        {title && (
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
        <button onClick={onUploadImage}>
          <ImageFileIcon />
        </button>
      </div>
    </InputWrapper>
  );
}
