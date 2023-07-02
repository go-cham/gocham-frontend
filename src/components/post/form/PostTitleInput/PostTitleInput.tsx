import { ChangeEvent, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import DeleteIcon from '@/components/icons/DeleteIcon';
import ImageFileIcon from '@/components/icons/ImageFileIcon';
import useFocus from '@/hooks/useFocus';
import useHover from '@/hooks/useHover';
import { twMergeCustom } from '@/libs/tw-merge';

interface PostTitleInputProps {
  error?: string | null;
  register?: UseFormRegisterReturn;
  onUploadImage?: () => void;
  className?: string;
}

export default function PostTitleInput({
  error,
  register,
  onUploadImage,
  className,
}: PostTitleInputProps) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const { ref: inputRef, isFocusing: inputFocused } =
    useFocus<HTMLInputElement>();
  const { ref: resetRef, isFocusing: resetFocused } =
    useFocus<HTMLButtonElement>();
  const { ref: hoverRef, isHovering } = useHover<HTMLInputElement>();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredTitle(e.target.value);
  };

  const handleTitleReset = () => {
    if (!inputRef.current?.value) {
      return;
    }
    inputRef.current.value = '';
    inputRef.current?.focus();
    setEnteredTitle('');
  };

  const showResetButton = enteredTitle && (isHovering || inputFocused);

  return (
    <div className={twMergeCustom('flex w-[34rem] flex-col', className)}>
      <div className="flex space-x-[0.7rem]">
        <label className="text-subheading">글 제목</label>
        <span className="text-body1 text-[#b0b2b8]">
          (사진 최대 3장 첨부 가능)
        </span>
      </div>
      <div ref={hoverRef} className="relative">
        <input
          {...register}
          ref={(e) => {
            register?.ref(e);
            inputRef.current = e;
          }}
          type="text"
          placeholder="제목 입력"
          maxLength={30}
          className={twMergeCustom(
            'mt-[1.3rem] w-full border-b-[0.2rem] border-custom-gray-500 bg-transparent pb-[0.9rem] text-body4 placeholder:text-body3 placeholder:text-custom-text-400',
            (inputFocused || resetFocused) &&
              '-mb-[0.2rem] border-b-[0.4rem] border-custom-gray-800',
            error &&
              'border-custom-semantic-warn-500 focus:border-custom-semantic-warn-500'
          )}
          onChange={handleTitleChange}
        />
        <div className="absolute bottom-0 right-0 flex items-center space-x-[0.8rem]">
          <button
            ref={resetRef}
            onClick={handleTitleReset}
            className={!showResetButton ? 'hidden' : ''}
          >
            <DeleteIcon
              className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full bg-custom-gray-300"
              color="white"
            />
          </button>
          <button>
            <ImageFileIcon className="cursor-pointer" onClick={onUploadImage} />
          </button>
        </div>
      </div>
      {error && (
        <span className="mt-[0.7rem] self-end text-body1 text-custom-semantic-warn-500">
          {error}
        </span>
      )}
    </div>
  );
}
