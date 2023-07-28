import { ChangeEvent, useEffect, useRef, useState } from 'react';

import InputLayout from '@/components/input/InputLayout';
import { UserInformation } from '@/types/user';

interface BirthdateFormProps {
  onInputChange: (year: string, month: string, day: string) => void;
  userInformation: UserInformation;
}

type BirthDateType = {
  year: string;
  month: string;
  day: string;
};

export default function BirthdateForm({
  onInputChange,
  userInformation,
}: BirthdateFormProps) {
  const yearRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  const [birthDate, setBirthDate] = useState<BirthDateType>({
    year: userInformation.birthDay.split('-')[0],
    month: userInformation.birthDay.split('-')[1],
    day: userInformation.birthDay.split('-')[2],
  });

  const [errorCase, setErrorCase] = useState({
    younger1900: false,
    older2005: false,
    notInputLength4: false,
    errorMonth: false,
    errorDay: false,
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value !== '' && isNaN(parseInt(value))) {
      return;
    }
    if (name === 'year' && value.length === 4) {
      monthRef.current?.focus();
    } else if (name === 'month') {
      if (value.length === 1 && Number(value) >= 2) {
        dayRef.current?.focus();
      } else if (value.length === 2) {
        dayRef.current?.focus();
      }
    }

    if (name === 'year' && value.length === 4 && Number(value) <= 1900) {
      setErrorCase((data) => ({ ...data, younger1900: true }));
    } else if (name === 'year' && value.length === 4 && Number(value) > 2005) {
      setErrorCase((data) => ({ ...data, older2005: true }));
    } else if (name === 'month' && (Number(value) > 12 || Number(value) < 1)) {
      setErrorCase((data) => ({ ...data, errorMonth: true }));
    } else if (name === 'day' && (Number(value) > 31 || Number(value) < 1)) {
      setErrorCase((data) => ({ ...data, errorDay: true }));
    }

    // ok case
    if (
      name === 'year' &&
      value.length === 4 &&
      Number(value) > 1900 &&
      Number(value) < 2005
    ) {
      setErrorCase((data) => ({
        ...data,
        younger1900: false,
        older2005: false,
      }));
    } else if (name === 'month' && Number(value) <= 12 && Number(value) >= 1) {
      setErrorCase((data) => ({ ...data, errorMonth: false }));
    } else if (name === 'day' && Number(value) <= 31 && Number(value) >= 1) {
      setErrorCase((data) => ({ ...data, errorDay: false }));
    }

    setBirthDate((prevBirthDate) => ({
      ...prevBirthDate,
      [name]: value,
    }));
  };

  useEffect(() => {
    onInputChange(birthDate.year, birthDate.month, birthDate.day);
  }, [birthDate]);

  const checkYearLength = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value.length !== 4) {
      setErrorCase((data) => ({
        ...data,
        notInputLength4: true,
      }));
    } else {
      setErrorCase((data) => ({
        ...data,
        notInputLength4: false,
      }));
    }
  };

  let error = '';
  if (errorCase.notInputLength4) {
    error = '태어난 년도는 4자리를 입력해주세요.';
  }
  if (errorCase.older2005) {
    error = '14세 이상만 가입할 수 있습니다.';
  }
  if (errorCase.younger1900) {
    error = '죄송해요🙏 20세기 사람들부터 이용 가능합니다.';
  }
  if (errorCase.errorMonth) {
    error = '1~12월 사이의 값만 입력해주세요.';
  }
  if (errorCase.errorDay) {
    error = '1~31일 사이의 값만 입력해주세요.';
  }

  return (
    <InputLayout label="생년월일" error={error}>
      <div className="flex space-x-[0.2rem] text-[1.4rem]">
        <input
          type="text"
          id="year"
          name="year"
          maxLength={4}
          ref={yearRef}
          value={birthDate.year}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={(e) => {
            handleInputBlur();
            checkYearLength(e);
          }}
          className="w-[4.5rem] bg-transparent text-right"
        />
        <span>년</span>
        <input
          type="text"
          id="month"
          name="month"
          maxLength={2}
          ref={monthRef}
          value={birthDate.month}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-[2.9rem] bg-transparent text-right"
        />
        <span>월</span>
        <input
          type="text"
          id="day"
          name="day"
          maxLength={2}
          ref={dayRef}
          value={birthDate.day}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-[2.9rem] bg-transparent text-right"
        />
        <span>일</span>
      </div>
    </InputLayout>
  );
}
