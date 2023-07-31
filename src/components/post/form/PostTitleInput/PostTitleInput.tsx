import { ChangeEvent, useRef, useState } from 'react';

import DeleteIcon from '@/components/icons/DeleteIcon';
import ImageFileIcon from '@/components/icons/ImageFileIcon';
import InputWrapper from '@/components/ui/inputs/InputWrapper';

interface PostTitleInputProps {
  id?: string;
  errorMessage?: string | null;
  onUploadImage?: (file: File) => void;
  uploadDisabled: boolean;
  uploadDisabledMessage?: string;
  onChange?: (title: string) => void;
  className?: string;
  defaultValue?: string;
}

export default function PostTitleInput({
  id,
  errorMessage,
  onUploadImage,
  uploadDisabled,
  uploadDisabledMessage,
  onChange,
  className,
  defaultValue,
}: PostTitleInputProps) {
  const [title, setTitle] = useState(defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showReset, setShowReset] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onChange && onChange(newTitle);
    setShowReset(!!newTitle);
  };

  const handleReset = () => {
    setTitle('');
    inputRef.current?.focus();
    onChange && onChange('');
    setShowReset(false);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUploadImage && onUploadImage(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <InputWrapper
      label="제목"
      subLabel="사진 최대 3장 첨부 가능"
      errorMessage={errorMessage}
      className={className}
      labelClassName="font-custom-subheading"
    >
      <input
        id={id}
        ref={inputRef}
        type="text"
        placeholder="제목 입력"
        maxLength={30}
        className="w-full bg-transparent pr-[7rem] font-system-body4 placeholder:text-text-subExplain-400 placeholder:font-system-body3"
        onChange={handleTitleChange}
        value={title}
        onFocus={() => {
          if (title) setShowReset(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowReset(false);
          }, 0);
        }}
      />
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center space-x-[0.8rem]">
        {showReset && (
          <button onClick={handleReset}>
            <DeleteIcon
              className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full bg-background-button-300"
              color="white"
            />
          </button>
        )}
        <label onClick={() => uploadDisabled && alert(uploadDisabledMessage)}>
          <ImageFileIcon className="cursor-pointer" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploadDisabled}
          />
        </label>
      </div>
    </InputWrapper>
  );
}
