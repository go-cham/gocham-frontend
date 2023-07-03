import { ChangeEvent, useState } from 'react';

import AlertIcon from '@/components/icons/AlertIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import InputWrapper from '@/components/ui/InputWrapper';

interface NicknameInputProps {
  onChange?: (nickname: string) => void;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}

export default function NicknameInput({
  onChange,
  successMessage,
  errorMessage,
  className,
}: NicknameInputProps) {
  const [nickname, setNickname] = useState('');

  const handleReset = () => {
    setNickname('');
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    onChange && onChange(newNickname);
  };

  return (
    <InputWrapper
      label="닉네임"
      successMessage={successMessage}
      errorMessage={errorMessage}
      className={className}
    >
      <input
        type="text"
        placeholder="한글, 영어, 숫자 포함 최대 10자"
        onChange={handleNicknameChange}
        value={nickname}
        maxLength={10}
        className="w-full bg-transparent text-body4 placeholder:text-body3"
      />
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center space-x-[0.5rem]">
        <button
          onClick={handleReset}
          className="hidden group-focus-within:block"
        >
          <DeleteIcon
            className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full bg-custom-gray-300"
            color="white"
          />
        </button>
        {successMessage && <CheckIcon color="#62be4a" />}
        {errorMessage && <AlertIcon />}
      </div>
    </InputWrapper>
  );
}
