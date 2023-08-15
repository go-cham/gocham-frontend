import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import useUser from '@/apis/hooks/users/useUser';
import BirthDateInput from '@/components/register/form/BirthDateInput';
import { BirthDate } from '@/components/register/form/BirthDateInput/BirthDateInput';
import GenderSelect from '@/components/register/form/GenderSelect';
import NicknameInput from '@/components/register/form/NicknameInput';
import { axiosInstance } from '@/libs/axios';
import { Gender } from '@/types/user';
import { parseDateString } from '@/utils/date/parseDateString';
import { validateBirthDate } from '@/utils/validations/birthDate';
import { validateNickname } from '@/utils/validations/nickname';

interface FormData {
  nickname: string;
  birthDate: string;
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
    birthDate: initialData.birthDate || '',
    gender: initialData.gender || null,
  });
  const [isDirty, setIsDirty] = useState({
    nickname: false,
    birthDate: false,
  });
  const [errorMessage, setErrorMessage] = useState<
    Record<'nickname' | 'birthDate', string | null>
  >({
    nickname: null,
    birthDate: null,
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
  const birthDateSuccessMessage =
    isDirty.birthDate && !errorMessage.birthDate ? ' ' : null;

  const handleBirthDateChange = ({ year, month, day }: BirthDate) => {
    setIsDirty({ ...isDirty, birthDate: true });
    setFormData({ ...formData, birthDate: `${year}-${month}-${day}` });

    setErrorMessage({
      ...errorMessage,
      birthDate: isDirty.birthDate
        ? validateBirthDate({ year, month, day })
        : null,
    });
  };

  const handleGenderChange = (gender: Gender) => {
    setFormData({ ...formData, gender });
  };

  useEffect(() => {
    const isValid = Boolean(
      formData.nickname &&
        formData.birthDate &&
        formData.gender &&
        !errorMessage.nickname &&
        !errorMessage.birthDate,
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
      <BirthDateInput
        className="w-full"
        onChange={handleBirthDateChange}
        errorMessage={errorMessage.birthDate}
        successMessage={birthDateSuccessMessage}
        defaultValue={parseDateString(initialData.birthDate)}
      />
      <GenderSelect
        onChange={handleGenderChange}
        defaultValue={initialData.gender}
      />
    </div>
  );
}
