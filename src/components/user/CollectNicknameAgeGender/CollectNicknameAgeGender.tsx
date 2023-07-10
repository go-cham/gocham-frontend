import { AxiosError } from 'axios';
import { FormEvent, useEffect, useState } from 'react';

import useUser from '@/apis/hooks/users/useUser';
import BirthdayInput from '@/components/register/form/BirthdayInput';
import { Birthday } from '@/components/register/form/BirthdayInput/BirthdayInput';
import NicknameInput from '@/components/register/form/NicknameInput';
import Button from '@/components/ui/buttons/Button';
import { axiosInstance } from '@/libs/axios';
import { Gender } from '@/types/user';
import { validateBirthday } from '@/utils/validations/birthday';
import { validateNickname } from '@/utils/validations/nickname';

interface CollectNicknameAgeGenderProps {
  onSubmit?: (nickname: string, birthday: string, gender: Gender) => void;
  onChange?: (
    nickname: string,
    birthday: { year: string; month: string; day: string },
    gender: Gender | null
  ) => void;
  onValidate?: (isValid: boolean) => void;
}

export default function CollectNicknameAgeGender({
  onSubmit,
  onChange,
  onValidate,
}: CollectNicknameAgeGenderProps) {
  const { user } = useUser();
  const [isDirty, setIsDirty] = useState({
    nickname: false,
    birthday: false,
    gender: false,
  });
  const [nickname, setNickname] = useState('');
  const initialBirthday = user?.birthday
    ? {
        year: new Date(user.birthday).getFullYear() + '',
        month: new Date(user.birthday).getMonth() + 1 + '',
        day: new Date(user.birthday).getDate() + '',
      }
    : {
        year: '',
        month: '',
        day: '',
      };
  const [birthday, setBirthday] = useState(initialBirthday);
  const [gender, setGender] = useState<Gender | null>(null);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<
    string | null
  >(null);

  const handleNicknameInputChange = async (nickname: string) => {
    onChange && onChange(nickname, birthday, gender);
    setIsDirty((prev) => ({ ...prev, nickname: true }));
    setNickname(nickname);

    let error = validateNickname(nickname);
    if (!error) {
      try {
        await axiosInstance.get(`/user/${user?.id}/duplicated-nickname`, {
          params: { nickname },
        });
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 400) {
          error = '이미 존재하는 닉네임입니다.';
        }
      }
    }
    setNicknameErrorMessage(error);
  };

  //생년월일 관련
  const handleBirthDateInputChange = ({ year, month, day }: Birthday) => {
    onChange &&
      onChange(
        nickname,
        { year: year || '', month: month || '', day: day || '' },
        gender
      );
    setIsDirty((prev) => ({ ...prev, birthday: true }));
    setBirthday({ year: year || '', month: month || '', day: day || '' });
  };

  const handleSelectGender = (gender: Gender) => {
    onChange && onChange(nickname, birthday, gender);
    setGender(gender);
    setIsDirty({ ...isDirty, gender: true });
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
    onSubmit && onSubmit(nickname, formattedBirthday, gender);
  };

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

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user) {
      setGender(user.sex);
    }
  }, []);

  useEffect(() => {
    (isDirty.nickname || isDirty.birthday || isDirty.gender) &&
      onValidate &&
      onValidate(!!nextEnabled);
  }, [nextEnabled]);

  return (
    <form className="space-y-[2.9rem]" onSubmit={handleSubmit}>
      <NicknameInput
        className="w-full"
        onChange={handleNicknameInputChange}
        errorMessage={nicknameErrorMessage}
        successMessage={nicknameSuccessMessage}
        defaultValue={user.nickname}
      />
      <BirthdayInput
        className="w-full"
        onChange={handleBirthDateInputChange}
        errorMessage={birthdayErrorMessage}
        successMessage={birthdaySuccessMessage}
        defaultValue={{
          year: birthday.year,
          month: birthday.month,
          day: birthday.day,
        }}
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
