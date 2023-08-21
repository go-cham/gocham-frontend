import { ChangeEvent, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import DeleteIcon from '@/common/components/icons/DeleteIcon';
import ImageFileIcon from '@/common/components/icons/ImageFileIcon';

interface PostVoteInputProps {
  id?: string;
  image?: string | null;
  onUploadImage?: (file: File) => void;
  onDeleteImage?: () => void;
  onChange?: (item: string) => void;
  className?: string;
  hasError?: boolean;
  errorMessage?: string | null;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
  defaultValue?: string;
}

export function PostVoteInput({
  id,
  image,
  onUploadImage,
  onDeleteImage,
  onChange,
  className,
  hasError,
  errorMessage,
  placeholder = '항목 입력',
  maxLength = 15,
  readOnly,
  defaultValue,
}: PostVoteInputProps) {
  const [item, setItem] = useState(defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showReset, setShowReset] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
    const newItem = e.target.value;
    setItem(newItem);
    onChange && onChange(newItem);
    setShowReset(!!newItem);
  };

  const handleReset = () => {
    setItem('');
    onChange && onChange('');
    inputRef.current?.focus();
    setShowReset(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadImage && onUploadImage(e.target.files[0]);
    }
  };

  return (
    <div
      className={twMerge(
        'group relative w-[34rem] rounded-[0.5rem]',
        className,
        readOnly && 'pointer-events-none bg-background-voteBg-100',
      )}
    >
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          type="text"
          onFocus={() => {
            if (item) setShowReset(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowReset(false);
            }, 200);
          }}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={handleChange}
          value={item}
          readOnly={readOnly}
          className={twMerge(
            'w-full rounded-[0.5rem] border border-background-dividerLine-300 bg-transparent py-[1.2rem] pl-[1.3rem] font-system-body4 placeholder:text-text-subExplain-400 placeholder:font-system-body3 group-focus-within:border-text-subTitle-700',
            hasError &&
              'border-semantic-warn-500 group-focus-within:border-semantic-warn-500',
            readOnly && 'text-text-explain-500',
          )}
        />
        <div className="absolute right-[1.2rem] top-1/2 flex -translate-y-1/2 space-x-[0.8rem]">
          {showReset && (
            <button tabIndex={-1} onFocus={() => setShowReset(true)}>
              <DeleteIcon
                className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full bg-background-button-300"
                color="white"
                onClick={handleReset}
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
              {!readOnly && (
                <button onClick={onDeleteImage}>
                  <DeleteIcon
                    className="absolute right-0 top-0 h-[1.6rem] w-[1.6rem] bg-[#676a72]"
                    color="white"
                  />
                </button>
              )}
            </div>
          )}
          {!image && onUploadImage && (
            <label>
              <ImageFileIcon className="cursor-pointer" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      </div>
      {errorMessage && (
        <div className="w-full text-right">
          <span className="text-semantic-warn-500 font-system-body1">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
}
