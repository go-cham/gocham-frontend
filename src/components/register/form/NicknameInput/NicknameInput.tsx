import { ChangeEvent, useRef, useState } from 'react';

import AlertIcon from '@/components/icons/AlertIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import InputWrapper from '@/components/ui/InputWrapper';
import { twMergeCustom } from '@/libs/tw-merge';

interface NicknameInputProps {
  onChange?: (nickname: string) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
  className?: string;
}

export default function NicknameInput({
  onChange,
  successMessage,
  errorMessage,
  className,
}: NicknameInputProps) {
  const [nickname, setNickname] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    onChange && onChange(newNickname);
  };

  const handleReset = () => {
    setNickname('');
    inputRef.current?.focus();
    onChange && onChange('');
  };

  return (
    <InputWrapper
      label="닉네임"
      successMessage={successMessage}
      errorMessage={errorMessage}
      className={className}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="한글, 영어, 숫자 포함 최대 10자"
        onChange={handleNicknameChange}
        value={nickname}
        maxLength={10}
        className="w-full bg-transparent text-body4 text-custom-gray-900 placeholder:text-body3 placeholder:text-custom-gray-400"
      />
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center space-x-[0.5rem]">
        {nickname && (
          <button
            onClick={handleReset}
            className="hidden group-focus-within:block"
          >
            <DeleteIcon
              className={twMergeCustom(
                'h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full bg-custom-gray-300',
                !successMessage && !errorMessage && 'mr-[1.3rem]'
              )}
              color="white"
            />
          </button>
        )}
        {successMessage && <CheckIcon color="#62be4a" />}
        {errorMessage && <AlertIcon />}
      </div>
    </InputWrapper>
  );
}
