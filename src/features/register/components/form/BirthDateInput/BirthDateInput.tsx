import { ChangeEvent, useRef, useState } from 'react';
import AlertIcon from '@/common/components/icons/AlertIcon';
import CheckIcon from '@/common/components/icons/CheckIcon';
import DeleteIcon from '@/common/components/icons/DeleteIcon';
import { InputWrapper } from '@/common/components/ui/inputs';
import { fixDate } from '@/common/utils/validations/birth-date';

export interface BirthDate {
  year?: string;
  month?: string;
  day?: string;
}

interface BirthDateInputProps {
  onChange: (birthDate: BirthDate) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
  className?: string;
  defaultValue?: { year: string; month: string; day: string } | null;
}

export function BirthDateInput({
  onChange,
  successMessage,
  errorMessage,
  className,
  defaultValue,
}: BirthDateInputProps) {
  const [birthDate, setBirthDate] = useState<BirthDate>(
    defaultValue || {
      year: '',
      month: '',
      day: '',
    },
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
    const newBirthDate = {
      ...birthDate,
      [e.target.name]: e.target.value,
    };
    setBirthDate(newBirthDate);
    onChange(newBirthDate);
    setShowReset(
      Boolean(newBirthDate.year || newBirthDate.month || newBirthDate.day),
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
    if (birthDate.year || birthDate.month || birthDate.day) {
      setTimeout(() => {
        setShowReset(true);
      }, 10);
    }
  };

  const handleBlur = () => {
    const { year, month, day } = birthDate;
    const fixedBirthDate = fixDate(year, month, day);
    setBirthDate(fixedBirthDate);
    onChange(fixedBirthDate);
    setTimeout(() => {
      setShowReset(false);
    }, 200);
  };

  const handleReset = () => {
    setBirthDate({
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
          value={birthDate.year}
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
          value={birthDate.month}
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
          value={birthDate.day}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <span>일</span>
      </div>
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center space-x-[0.5rem]">
        {showReset && (
          <button onClick={handleReset} tabIndex={-1}>
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
