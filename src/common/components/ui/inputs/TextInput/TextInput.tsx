import { ChangeEvent, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import AlertIcon from '@/common/components/icons/AlertIcon';
import DeleteIcon from '@/common/components/icons/DeleteIcon';
import InputWrapper from '@/common/components/ui/inputs/InputWrapper';
import CheckIcon from './CheckIcon';

interface TitleInputProps {
  label: string;
  placeholder: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
  className?: string;
  defaultValue?: string;
}

export default function TextInput({
  label,
  placeholder,
  maxLength,
  onChange,
  successMessage,
  errorMessage,
  className,
  defaultValue,
}: TitleInputProps) {
  const [value, setValue] = useState(defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showReset, setShowReset] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
    const newValue = e.target.value;
    setValue(newValue);
    onChange && onChange(newValue);
    setShowReset(!!newValue);
  };

  const handleReset = () => {
    setValue('');
    inputRef.current?.focus();
    onChange && onChange('');
    setShowReset(false);
  };

  return (
    <InputWrapper
      label={label}
      successMessage={successMessage}
      errorMessage={errorMessage}
      className={className}
      labelClassName="font-custom-body1"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
        className="w-full bg-transparent font-system-body4 placeholder:text-text-subExplain-400 placeholder:font-system-body3"
        onFocus={() => {
          if (value) setShowReset(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowReset(false);
          }, 200);
        }}
      />
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center space-x-[0.5rem]">
        {showReset && (
          <button onClick={handleReset} tabIndex={-1}>
            <DeleteIcon
              className={twMerge(
                'h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full bg-background-button-300',
                !successMessage && !errorMessage && 'mr-[1.3rem]',
              )}
              color="white"
            />
          </button>
        )}
        {successMessage && <CheckIcon />}
        {errorMessage && <AlertIcon />}
      </div>
    </InputWrapper>
  );
}
