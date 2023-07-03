import { ChangeEvent, useState } from 'react';

import AlertIcon from '@/components/icons/AlertIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { twMergeCustom } from '@/libs/tw-merge';

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

  const maxLengthCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthday({
      ...birthday,
      [e.target.name]: +e.target.value,
    });

    onChange &&
      onChange({
        ...birthday,
        [e.target.name]: +e.target.value,
      });
  };

  const handleReset = () => {
    setBirthday({
      year: undefined,
      month: undefined,
      day: undefined,
    });
  };

  return (
    <div className={twMergeCustom('flex w-[34rem] flex-col', className)}>
      <label className="text-body1 text-gray-800">생년월일</label>
      <div
        className={twMergeCustom(
          'group relative mt-[0.4rem] flex w-full space-x-[0.8rem] border-b-[0.2rem] py-[0.5rem] text-body4 focus-within:-mb-[0.2rem] focus-within:border-b-[0.4rem] focus-within:border-custom-gray-800',
          successMessage &&
            'border-custom-semantic-success-600 focus-within:border-custom-semantic-success-600',
          errorMessage &&
            'border-custom-semantic-warn-500 focus-within:border-custom-semantic-warn-500'
        )}
      >
        <div className="flex space-x-[0.3rem]">
          <input
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
      </div>
      {(successMessage || errorMessage) && (
        <span
          className={twMergeCustom(
            'mt-[0.7rem] self-end text-body1',
            successMessage && 'text-custom-semantic-success-600',
            errorMessage && 'text-custom-semantic-warn-500'
          )}
        >
          {successMessage || errorMessage}
        </span>
      )}
    </div>
  );
}
