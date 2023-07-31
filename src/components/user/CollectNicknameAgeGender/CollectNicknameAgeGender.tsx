import { FormEvent, useState } from 'react';

import Button from '@/components/ui/buttons/Button';
import NicknameAgeGenderForm from '@/components/user/NicknameAgeGenderForm';
import { Gender } from '@/types/user';

interface FormData {
  nickname: string;
  birthday: string;
  gender: Gender | null;
}

interface CollectNicknameBirthdayGenderProps {
  initialData: FormData;
  onChange: (nickname: string, birthday: string, gender: Gender | null) => void;
  onNext: () => void;
}

export default function CollectNicknameAgeGender({
  initialData,
  onChange,
  onNext,
}: CollectNicknameBirthdayGenderProps) {
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleChange = (data: FormData, isValid: boolean) => {
    setButtonEnabled(isValid);
    onChange(data.nickname, data.birthday, data.gender);
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
