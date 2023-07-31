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
  onNext: (nickname: string, birthday: string, gender: Gender) => void;
}

export default function CollectNicknameAgeGender({
  initialData,
  onNext,
}: CollectNicknameBirthdayGenderProps) {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleChange = (data: FormData, isValid: boolean) => {
    setFormData(data);
    setButtonEnabled(isValid);
  };

  const handleNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.nickname && formData.birthday && formData.gender) {
      onNext(formData.nickname, formData.birthday, formData.gender);
    }
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
