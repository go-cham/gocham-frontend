import { ChangeEvent, useRef, useState } from 'react';

import AlertIcon from '@/components/icons/AlertIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import InputWrapper from '@/components/ui/InputWrapper';

interface Birthday {
  year: number | undefined;
  month: number | undefined;
  day: number | undefined;
}

interface BirthdayInputProps {
  onChange?: (birthday: Birthday) => void;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}

export default function BirthdayInput({
  onChange,
  successMessage,
  errorMessage,
  className,
}: BirthdayInputProps) {
  const [birthday, setBirthday] = useState<Birthday>({
    year: undefined,
    month: undefined,
    day: undefined,
  });
  const yearRef = useRef<HTMLInputElement>(null);

  const maxLengthCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBirthday = {
      ...birthday,
      [e.target.name]: +e.target.value,
    };
    setBirthday(newBirthday);
    onChange && onChange(newBirthday);
  };

  const handleReset = () => {
    setBirthday({
      year: undefined,
      month: undefined,
      day: undefined,
    });
    yearRef.current?.focus();
  };

  return (
    <InputWrapper
      label="생년월일"
      successMessage={successMessage}
      errorMessage={errorMessage}
      className={className}
    >
      <div className="flex space-x-[0.3rem]">
        <input
          ref={yearRef}
          type="number"
          maxLength={4}
          onInput={maxLengthCheck}
          className="w-[3.6rem] bg-transparent text-right"
          onChange={handleChange}
          name="year"
          value={birthday.year || ''}
        />
        <span>년</span>
      </div>
      <div className="flex space-x-[0.3rem]">
        <input
          type="number"
          maxLength={2}
          onInput={maxLengthCheck}
          className="w-[1.8rem] bg-transparent text-right"
          onChange={handleChange}
          name="month"
          value={birthday.month || ''}
        />
        <span>월</span>
      </div>
      <div className="flex space-x-[0.3rem]">
        <input
          type="number"
          maxLength={2}
          onInput={maxLengthCheck}
          className="w-[1.8rem] bg-transparent text-right"
          onChange={handleChange}
          name="day"
          value={birthday.day || ''}
        />
        <span>일</span>
      </div>
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center space-x-[0.5rem]">
        {(birthday.year || birthday.month || birthday.day) && (
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
        {successMessage && <CheckIcon color="#62be4a" />}
        {errorMessage && <AlertIcon />}
      </div>
    </InputWrapper>
  );
}
