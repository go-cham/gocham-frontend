import { ChangeEvent, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import AlertIcon from '@/components/icons/AlertIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import ImageFileIcon from '@/components/icons/ImageFileIcon';
import useFocus from '@/hooks/useFocus';
import useHover from '@/hooks/useHover';
import { twMergeCustom } from '@/libs/tw-merge';

interface NicknameInputProps {
  register?: UseFormRegisterReturn;
  className?: string;
  success?: string;
  error?: string;
}

export default function NicknameInput({
  register,
  className,
  success,
  error,
}: NicknameInputProps) {
  const [enteredNickname, setEnteredNickname] = useState('');
  const { ref: inputRef, isFocusing: inputFocused } =
    useFocus<HTMLInputElement>();
  const { ref: resetRef, isFocusing: resetFocused } =
    useFocus<HTMLButtonElement>();
  const { ref: hoverRef, isHovering } = useHover<HTMLInputElement>();

  const handleNicknameReset = () => {
    if (!inputRef.current?.value) {
      return;
    }
    inputRef.current.value = '';
    inputRef.current?.focus();
    setEnteredNickname('');
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredNickname(e.target.value);
  };

  const showResetButton = enteredNickname && (isHovering || inputFocused);

  return (
    <div className={twMergeCustom('flex w-[34rem] flex-col', className)}>
      <label className="text-body1">닉네임</label>
      <div ref={hoverRef} className="relative">
        <input
          {...register}
          ref={(e) => {
            register?.ref(e);
            inputRef.current = e;
          }}
          type="text"
          placeholder="한글, 영어, 숫자 포함 최대 10자"
          onChange={handleNicknameChange}
          className={twMergeCustom(
            'w-full border-b-[0.2rem] border-custom-text-500 bg-transparent py-[0.7rem] text-body4 placeholder:text-body3',
            (inputFocused || resetFocused) &&
              '-mb-[0.2rem] border-b-[0.4rem] border-custom-gray-800',
            success && 'border-custom-semantic-success-600',
            error && 'border-custom-semantic-warn-500'
          )}
        />
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 cursor-pointer items-center space-x-[0.5rem]">
          <button
            ref={resetRef}
            onClick={handleNicknameReset}
            className={!showResetButton ? 'hidden' : ''}
          >
            <DeleteIcon
              className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full bg-custom-gray-300"
              color="white"
            />
          </button>
          {success && <CheckIcon color="#62be4a" />}
          {error && <AlertIcon />}
        </div>
      </div>
      {(success || error) && (
        <span
          className={twMergeCustom(
            'mt-[0.7rem] self-end text-body1',
            success && 'text-custom-semantic-success-600',
            error && 'text-custom-semantic-warn-500'
          )}
        >
          {success || error}
        </span>
      )}
    </div>
  );
}
