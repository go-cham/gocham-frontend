import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { axiosPrivate } from '@/common/libs/axios';
import { parseDateString } from '@/common/utils/date/parseDateString';
import { validateBirthDate } from '@/common/utils/validations/birth-date';
import { validateNickname } from '@/common/utils/validations/nickname';
import {
  BirthDateInput,
  GenderSelect,
  NicknameInput,
} from '@/features/register/components/form';
import { BirthDate } from '@/features/register/components/form';
import { useUser } from '@/features/user/queries';
import { Gender } from '@/features/user/types';

interface FormData {
  nickname: string;
  birthDate: string;
  gender: Gender | null;
}

interface NicknameAgeGenderFormProps {
  initialData: FormData;
  onChange: (data: FormData, isValid: boolean) => void;
}

export function NicknameAgeGenderForm({
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

  const handleNicknameChange = useCallback(
    async (nickname: string) => {
      setIsDirty((prevIsDirty) => ({ ...prevIsDirty, nickname: true }));
      setFormData((prevFormData) => ({ ...prevFormData, nickname }));

      let error = validateNickname(nickname);
      if (!error) {
        try {
          await axiosPrivate.get(`/user/${user?.id}/validate-nickname`, {
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
      setErrorMessage((prevErrorMessage) => ({
        ...prevErrorMessage,
        nickname: error,
      }));
    },
    [user?.id],
  );

  const nicknameSuccessMessage =
    isDirty.nickname && !errorMessage.nickname
      ? '사용 가능한 닉네임입니다.'
      : null;
  const birthDateSuccessMessage =
    isDirty.birthDate && !errorMessage.birthDate ? ' ' : null;

  const handleBirthDateChange = useCallback(
    ({ year, month, day }: BirthDate) => {
      setIsDirty((prevIsDirty) => ({ ...prevIsDirty, birthDate: true }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        birthDate: `${year}-${month}-${day}`,
      }));
      setErrorMessage((prevErrorMessage) => ({
        ...prevErrorMessage,
        birthDate: isDirty.birthDate
          ? validateBirthDate({ year, month, day })
          : null,
      }));
    },
    [isDirty.birthDate],
  );

  const handleGenderChange = useCallback((gender: Gender) => {
    setFormData((prevFormData) => ({ ...prevFormData, gender }));
  }, []);

  useEffect(() => {
    const isValid = Boolean(
      formData.nickname &&
        formData.birthDate &&
        formData.gender &&
        !errorMessage.nickname &&
        !errorMessage.birthDate,
    );
    onChange(formData, isValid);
  }, [formData, errorMessage, onChange]);

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
