import { ChangeEvent, useRef, useState } from 'react';

import AlertIcon from '@/components/icons/AlertIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import InputWrapper from '@/components/ui/inputs/InputWrapper';
import { fixDate } from '@/utils/validations/birthday';

export interface Birthday {
  year?: string;
  month?: string;
  day?: string;
}

interface BirthdayInputProps {
  onChange: (birthday: Birthday) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
  className?: string;
  defaultValue?: { year: string; month: string; day: string } | null;
}

export default function BirthdayInput({
  onChange,
  successMessage,
  errorMessage,
  className,
  defaultValue,
}: BirthdayInputProps) {
  const [birthday, setBirthday] = useState<Birthday>(
    defaultValue || {
      year: '',
      month: '',
      day: '',
    }
  );
  const yearRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const [showReset, setShowReset] = useState(false);

  const maxLengthCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBirthday = {
      ...birthday,
      [e.target.name]: e.target.value,
    };
    setBirthday(newBirthday);
    onChange(newBirthday);
    setShowReset(
      Boolean(newBirthday.year || newBirthday.month || newBirthday.day)
    );

    if (e.target.name === 'year' && e.target.value.length === 4) {
      setTimeout(() => {
        monthRef.current?.focus();
      }, 0);
    }
    if (e.target.name === 'month' && e.target.value.length === 2) {
      setTimeout(() => {
        dayRef.current?.focus();
      }, 0);
    }
  };

  const handleFocus = () => {
    if (birthday.year || birthday.month || birthday.day) {
      setTimeout(() => {
        setShowReset(true);
      }, 10);
    }
  };

  const handleBlur = () => {
    const { year, month, day } = birthday;
    const fixedBirthday = fixDate(year, month, day);
    setBirthday(fixedBirthday);
    onChange(fixedBirthday);
    setTimeout(() => {
      setShowReset(false);
    }, 0);
  };

  const handleReset = () => {
    setBirthday({
      year: '',
      month: '',
      day: '',
    });
    onChange &&
      onChange({
        year: '',
        month: '',
        day: '',
      });
    setShowReset(false);
    yearRef.current?.focus();
  };

  return (
    <InputWrapper
      label="생년월일"
      successMessage={successMessage}
      errorMessage={errorMessage}
      className={className}
      labelClassName="font-custom-body1"
    >
      <div className="flex space-x-[0.3rem]">
        <input
          ref={yearRef}
          type="number"
          inputMode="numeric"
          maxLength={4}
          onInput={maxLengthCheck}
          className="w-[3.6rem] bg-transparent text-right"
          onChange={handleChange}
          name="year"
          value={birthday.year}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <span>년</span>
      </div>
      <div className="flex space-x-[0.3rem]">
        <input
          ref={monthRef}
          type="number"
          inputMode="numeric"
          maxLength={2}
          onInput={maxLengthCheck}
          className="w-[1.8rem] bg-transparent text-right"
          onChange={handleChange}
          name="month"
          value={birthday.month}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <span>월</span>
      </div>
      <div className="flex space-x-[0.3rem]">
        <input
          ref={dayRef}
          type="number"
          inputMode="numeric"
          maxLength={2}
          onInput={maxLengthCheck}
          className="w-[1.8rem] bg-transparent text-right"
          onChange={handleChange}
          name="day"
          value={birthday.day}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <span>일</span>
      </div>
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center space-x-[0.5rem]">
        {showReset && (
          <button onClick={handleReset}>
            <DeleteIcon
              className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full bg-background-button-300"
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
