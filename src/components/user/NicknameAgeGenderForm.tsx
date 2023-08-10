import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import useUser from '@/apis/hooks/users/useUser';
import BirthdayInput from '@/components/register/form/BirthdayInput';
import { Birthday } from '@/components/register/form/BirthdayInput/BirthdayInput';
import GenderSelect from '@/components/register/form/GenderSelect';
import NicknameInput from '@/components/register/form/NicknameInput';
import { axiosInstance } from '@/libs/axios';
import { Gender } from '@/types/user';
import { parseDateString } from '@/utils/date/parseDateString';
import { validateBirthday } from '@/utils/validations/birthday';
import { validateNickname } from '@/utils/validations/nickname';

interface FormData {
  nickname: string;
  birthday: string;
  gender: Gender | null;
}

interface NicknameAgeGenderFormProps {
  initialData: FormData;
  onChange: (data: FormData, isValid: boolean) => void;
}

export default function NicknameAgeGenderForm({
  initialData,
  onChange,
}: NicknameAgeGenderFormProps) {
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    nickname: initialData.nickname || '',
    birthday: initialData.birthday || '',
    gender: initialData.gender || null,
  });
  const [isDirty, setIsDirty] = useState({
    nickname: false,
    birthday: false,
  });
  const [errorMessage, setErrorMessage] = useState<
    Record<'nickname' | 'birthday', string | null>
  >({
    nickname: null,
    birthday: null,
  });

  const handleNicknameChange = async (nickname: string) => {
    setIsDirty({ ...isDirty, nickname: true });
    setFormData({ ...formData, nickname });

    let error = validateNickname(nickname);
    if (!error) {
      try {
        await axiosInstance.get(`/user/${user?.id}/validate-nickname`, {
          params: { nickname },
        });
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 400) {
          const errorCode = e.response.data.errorCode;
          if (errorCode === 'IS_DUPLICATED_NICKNAME') {
            error = '이미 존재하는 닉네임입니다.';
          } else if (errorCode === 'IS_BAD_WORD') {
            error = '금칙어 입력이 불가합니다.';
          }
        }
      }
    }
    setErrorMessage({ ...errorMessage, nickname: error });
  };

  const nicknameSuccessMessage =
    isDirty.nickname && !errorMessage.nickname
      ? '사용 가능한 닉네임입니다.'
      : null;
  const birthdaySuccessMessage =
    isDirty.birthday && !errorMessage.birthday ? ' ' : null;

  const handleBirthdayChange = ({ year, month, day }: Birthday) => {
    setIsDirty({ ...isDirty, birthday: true });
    setFormData({ ...formData, birthday: `${year}-${month}-${day}` });

    setErrorMessage({
      ...errorMessage,
      birthday: isDirty.birthday
        ? validateBirthday({ year, month, day })
        : null,
    });
  };

  const handleGenderChange = (gender: Gender) => {
    setFormData({ ...formData, gender });
  };

  useEffect(() => {
    const isValid = Boolean(
      formData.nickname &&
        formData.birthday &&
        formData.gender &&
        !errorMessage.nickname &&
        !errorMessage.birthday,
    );

    onChange(formData, isValid);
  }, [formData, isDirty, errorMessage]);

  return (
    <div className="space-y-[2.9rem]">
      <NicknameInput
        className="w-full"
        onChange={handleNicknameChange}
        errorMessage={errorMessage.nickname}
        successMessage={nicknameSuccessMessage}
        defaultValue={initialData.nickname}
      />
      <BirthdayInput
        className="w-full"
        onChange={handleBirthdayChange}
        errorMessage={errorMessage.birthday}
        successMessage={birthdaySuccessMessage}
        defaultValue={parseDateString(initialData.birthday)}
      />
      <GenderSelect
        onChange={handleGenderChange}
        defaultValue={initialData.gender}
      />
    </div>
  );
}
