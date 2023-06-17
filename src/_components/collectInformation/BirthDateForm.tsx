import styled from '@emotion/styled';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import {
  InputWrap,
  userInformationType,
} from '@/_pages/collectInformation/CollectInformation';
import palette from '@/style/color';

import { ErrorMessage } from './CollectNicknameAgeGender';

interface BirthdateFormProps {
  onInputChange: (year: string, month: string, day: string) => void;
  userInformation: userInformationType;
}

type BirthDateType = {
  year: string;
  month: string;
  day: string;
};

const BirthdateForm: React.FC<BirthdateFormProps> = ({
  onInputChange,
  userInformation,
}) => {
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

  return (
    <InputWrap>
      <h2>생년월일</h2>
      <BirthInputBox isInputFocused={isInputFocused} errorCase={errorCase}>
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
        />
        <label className={'year'} htmlFor="year">
          년
        </label>
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
        />
        <label className={'month'} htmlFor="month">
          월
        </label>
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
        />
        <label className={'day'} htmlFor="day">
          일
        </label>
      </BirthInputBox>
      {errorCase.notInputLength4 && (
        <ErrorMessage>태어난 년도는 4자리를 입력해주세요.</ErrorMessage>
      )}
      {errorCase.older2005 && (
        <ErrorMessage>14세 이상만 가입할 수 있습니다.</ErrorMessage>
      )}
      {errorCase.younger1900 && (
        <ErrorMessage>
          죄송해요🙏 20세기 사람들부터 이용 가능합니다.
        </ErrorMessage>
      )}
      {errorCase.errorMonth && (
        <ErrorMessage>1~12월 사이의 값만 입력해주세요.</ErrorMessage>
      )}{' '}
      {errorCase.errorDay && (
        <ErrorMessage>1~31일 사이의 값만 입력해주세요.</ErrorMessage>
      )}
    </InputWrap>
  );
};

export default BirthdateForm;

const BirthInputBox = styled.form<{ isInputFocused: boolean; errorCase: any }>`
  display: flex;
  height: 4rem;
  align-items: center;
  transition: border-width 0.1s ease-in-out;
  box-sizing: border-box;
  border-bottom-style: solid;
  border-bottom-color: ${({ errorCase }) => {
    if (
      errorCase.older2005 ||
      errorCase.younger1900 ||
      errorCase.errorDay ||
      errorCase.errorMonth
    ) {
      return `${palette.Error}`;
    } else {
      return `${palette.Gray1}`;
    }
  }};
  border-bottom-width: ${({ isInputFocused }) => {
    if (isInputFocused) {
      return `0.4rem`;
    } else {
      return `0.2rem`;
    }
  }};
  & input {
    text-align: right;
  }
  & label {
    //margin-top: 1.3rem;
    font-size: 1.4rem;
    //margin-right: 0.2rem;
  }
  & #year {
    width: 4.5rem;
    border-bottom: 0;
  }
  & #month {
    width: 2.9rem;
    border-bottom: 0;
  }
  & #day {
    width: 2.9rem;
    border-bottom: 0;
  }
`;
