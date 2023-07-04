import { ChangeEvent, useRef, useState } from 'react';

import AlertIcon from '@/components/icons/AlertIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import InputWrapper from '@/components/ui/inputs/InputWrapper';
import { twMergeCustom } from '@/libs/tw-merge';

interface TitleInputProps {
  label: string;
  placeholder: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
  className?: string;
}

export default function TextInput({
  label,
  placeholder,
  maxLength,
  onChange,
  successMessage,
  errorMessage,
  className,
}: TitleInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  const handleReset = () => {
    setValue('');
    inputRef.current?.focus();
    onChange && onChange('');
  };

  return (
    <InputWrapper
      label={label}
      successMessage={successMessage}
      errorMessage={errorMessage}
      className={className}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
        className="w-full bg-transparent text-body4 text-custom-gray-900 placeholder:text-body3 placeholder:text-custom-gray-400"
      />
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center space-x-[0.5rem]">
        {value && (
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
