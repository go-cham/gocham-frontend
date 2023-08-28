import { FormEvent, useState } from 'react';
import Button from '@/common/components/ui/buttons/Button';
import NicknameAgeGenderForm from '@/features/user/components/NicknameAgeGenderForm';
import { Gender } from '@/features/user/types';

interface FormData {
  nickname: string;
  birthDate: string;
  gender: Gender | null;
}

interface CollectNicknameBirthDateGenderProps {
  initialData: FormData;
  onChange: (
    nickname: string,
    birthDate: string,
    gender: Gender | null,
  ) => void;
  onNext: () => void;
}

export default function CollectNicknameAgeGender({
  initialData,
  onChange,
  onNext,
}: CollectNicknameBirthDateGenderProps) {
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleChange = (data: FormData, isValid: boolean) => {
    setButtonEnabled(isValid);
    onChange(data.nickname, data.birthDate, data.gender);
  };

  const handleNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext}>
      <NicknameAgeGenderForm
        initialData={initialData}
        onChange={handleChange}
      />
      <Button
        disabled={!buttonEnabled}
        className="absolute bottom-[4.8rem] left-1/2 -translate-x-1/2"
      >
        다음
      </Button>
    </form>
  );
}
