import { ChangeEvent, useEffect, useState } from 'react';

import InputLayout from '@/components/input/InputLayout';
import { userInformationType } from '@/types/user';

import ErrorMessage from '../../input/ErrorMessage';

interface NicknameFormProps {
  onInputChange: (nickname: string) => void;
  userInformation: userInformationType;
}

export default function NicknameForm({
  onInputChange,
  userInformation,
}: NicknameFormProps) {
  const [nickname, setNickname] = useState(userInformation.nickname);
  const [errorCase, setErrorCase] = useState({
    over10letter: false,
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value.length > 10) {
      setErrorCase((data) => ({ over10letter: true }));
    } else {
      setErrorCase((data) => ({ over10letter: false }));
    }
    setNickname(value);
  };

  useEffect(() => {
    onInputChange(nickname);
  }, [nickname]);

  const error = errorCase.over10letter ? '10글자까지만 입력이 가능합니다.' : '';

  return (
    <InputLayout label="닉네임" error={error}>
      <input
        id="nickname-input"
        className={`bg-transparent text-[1.4rem]`}
        placeholder="최대 10자 입력"
        onChange={handleInputChange}
      />
    </InputLayout>
  );
}
