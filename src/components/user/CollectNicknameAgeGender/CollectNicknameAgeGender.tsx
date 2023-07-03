import { FormEvent, useState } from 'react';

import BirthdayInput from '@/components/register/form/BirthdayInput';
import { Birthday } from '@/components/register/form/BirthdayInput/BirthdayInput';
import NicknameInput from '@/components/register/form/NicknameInput';
import Button from '@/components/ui/buttons/Button';
import { Gender } from '@/types/user';
import { validateBirthday } from '@/utils/validations/birthday';
import { validateNickname } from '@/utils/validations/nickname';

interface CollectNicknameAgeGenderProps {
  onSubmit: (nickname: string, birthday: string, gender: Gender) => void;
}

export default function CollectNicknameAgeGender({
  onSubmit,
}: CollectNicknameAgeGenderProps) {
  const [isDirty, setIsDirty] = useState({
    nickname: false,
    birthday: false,
  });
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState({
    year: '',
    month: '',
    day: '',
  });
  const [gender, setGender] = useState<Gender | null>(null);

  const handleNicknameInputChange = (nickname: string) => {
    setIsDirty((prev) => ({ ...prev, nickname: true }));
    setNickname(nickname);
  };

  //생년월일 관련
  const handleBirthDateInputChange = ({ year, month, day }: Birthday) => {
    setIsDirty((prev) => ({ ...prev, birthday: true }));
    setBirthday({ year: year || '', month: month || '', day: day || '' });
  };

  const handleSelectGender = (gender: Gender) => {
    setGender(gender);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !nickname ||
      !birthday.year ||
      !birthday.month ||
      !birthday.day ||
      !gender
    ) {
      return;
    }
    const formattedBirthday = `${birthday.year}-${birthday.month.padStart(
      2,
      '0'
    )}-${birthday.day.padStart(2, '0')}`;
    onSubmit(nickname, formattedBirthday, gender);
  };

  const nicknameErrorMessage = isDirty.nickname
    ? validateNickname(nickname)
    : null;
  const nicknameSuccessMessage =
    isDirty.nickname && !nicknameErrorMessage
      ? '사용 가능한 닉네임입니다.'
      : null;
  const birthdayErrorMessage = isDirty.birthday
    ? validateBirthday(birthday)
    : null;
  const birthdaySuccessMessage =
    isDirty.birthday && !birthdayErrorMessage ? ' ' : null;

  const nextEnabled =
    nickname &&
    birthday &&
    !nicknameErrorMessage &&
    !birthdayErrorMessage &&
    gender;

  return (
    <form className="space-y-[2.9rem]" onSubmit={handleSubmit}>
      <NicknameInput
        className="w-full"
        onChange={handleNicknameInputChange}
        errorMessage={nicknameErrorMessage}
        successMessage={nicknameSuccessMessage}
      />
      <BirthdayInput
        className="w-full"
        onChange={handleBirthDateInputChange}
        errorMessage={birthdayErrorMessage}
        successMessage={birthdaySuccessMessage}
      />
      <div>
        <span className="text-body1">성별</span>
        <div className="mt-[0.7rem] flex justify-between">
          {(['male', 'female'] as const).map((currentGender) => (
            <button
              key={currentGender}
              type="button"
              className={`h-[3.9rem] w-[48%] rounded-[0.5rem] border-[1px] text-body4 ${
                gender === currentGender
                  ? 'border-custom-main-200 bg-custom-main-100 text-custom-main-500'
                  : 'border-custom-background-200 bg-white text-custom-text-500'
              }`}
              onClick={() => handleSelectGender(currentGender)}
            >
              {currentGender === 'male' ? '남자' : '여자'}
            </button>
          ))}
        </div>
      </div>
      <Button
        disabled={!nextEnabled}
        className="absolute bottom-[4.8rem] left-1/2 -translate-x-1/2"
      >
        다음
      </Button>
    </form>
  );
}
