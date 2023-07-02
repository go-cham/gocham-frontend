import { ChangeEvent, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import DeleteIcon from '@/components/icons/DeleteIcon';
import ImageFileIcon from '@/components/icons/ImageFileIcon';
import useFocus from '@/hooks/useFocus';
import useHover from '@/hooks/useHover';
import { twMergeCustom } from '@/libs/tw-merge';

interface PostVoteInputProps {
  register?: UseFormRegisterReturn;
  image?: string;
  onUploadImage?: () => void;
  onDeleteImage?: () => void;
  className?: string;
  error?: string;
}

export default function PostVoteInput({
  register,
  image,
  onUploadImage,
  onDeleteImage,
  className,
  error,
}: PostVoteInputProps) {
  const [enteredItem, setEnteredItem] = useState('');
  const { ref: inputRef, isFocusing: inputFocused } =
    useFocus<HTMLInputElement>();
  const { ref: resetRef, isFocusing: resetFocused } =
    useFocus<HTMLButtonElement>();
  const { ref: hoverRef, isHovering } = useHover<HTMLInputElement>();

  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredItem(e.target.value);
  };

  const handleItemReset = () => {
    if (!inputRef.current?.value) {
      return;
    }
    inputRef.current.value = '';
    inputRef.current?.focus();
    setEnteredItem('');
  };

  const showResetButton = enteredItem && (isHovering || inputFocused);

  return (
    <div
      ref={hoverRef}
      className={twMergeCustom('relative w-[34rem]', className)}
    >
      <input
        {...register}
        ref={(e) => {
          register?.ref(e);
          inputRef.current = e;
        }}
        type="text"
        maxLength={15}
        placeholder="항목 입력"
        onChange={handleItemChange}
        className={twMergeCustom(
          'w-full rounded-[0.5rem] border border-custom-background-200 bg-transparent py-[1.2rem] pl-[1.3rem] text-body4 placeholder:text-body3',
          (inputFocused || resetFocused) && 'border-custom-gray-800',
          error && 'border-custom-semantic-warn-500'
        )}
      />
      <div className="absolute right-[1.2rem] top-1/2 flex -translate-y-1/2 space-x-[0.8rem]">
        <button
          ref={resetRef}
          onClick={handleItemReset}
          className={!showResetButton ? 'hidden' : ''}
        >
          <DeleteIcon
            className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full bg-custom-gray-300"
            color="white"
          />
        </button>
        {image && (
          <div className="h-[4rem] w-[4rem]">
            <img src={image} alt="투표 이미지" className="h-full w-full" />
            <DeleteIcon
              className="absolute right-0 top-0 h-[1.6rem] w-[1.6rem] cursor-pointer bg-[#676a72]"
              color="white"
              onClick={onDeleteImage}
            />
          </div>
        )}
        {!image && (
          <ImageFileIcon onClick={onUploadImage} className="cursor-pointer" />
        )}
      </div>
    </div>
  );
}
