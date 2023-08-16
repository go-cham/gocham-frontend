import { FormEvent, useState } from 'react';
import { Button } from '@/common/components/ui/buttons';
import { RegionJobCategoryForm } from '@/features/user/components/RegionJobCategoryForm';

interface FormData {
  residenceId: number | null;
  job: string;
  categoryIds: number[];
}

interface CollectRegionJobCategoryProps {
  initialData: FormData;
  onSubmit?: (data: FormData) => void;
  onChange?: (data: FormData) => void;
  onValidate?: (isValid: boolean) => void;
}

export default function CollectNicknameAgeGender({
  initialData,
  onChange,
  onSubmit,
}: CollectRegionJobCategoryProps) {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleChange = (data: FormData, isValid: boolean) => {
    setButtonEnabled(isValid);
    setFormData(data);
    onChange && onChange(data);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <RegionJobCategoryForm
        initialData={initialData}
        onChange={handleChange}
      />
      <Button
        disabled={!buttonEnabled}
        className="absolute bottom-[4.8rem] left-1/2 -translate-x-1/2"
      >
        고참 시작하기
      </Button>
    </form>
  );
}
