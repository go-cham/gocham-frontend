import { useEffect, useState } from 'react';
import Chip from '@/common/components/ui/buttons/Chip';
import Select from '@/common/components/ui/selections/Select';
import {
  CATEGORY_OPTIONS,
  RESIDENCE_OPTIONS,
} from '@/common/constants/options';
import { validateJob } from '@/common/utils/validations/job';
import JobInput from '@/features/register/components/form/JobInput';

const MAX_CATEGORIES_SELECT = 4;

interface FormData {
  residenceId: number | null;
  job: string;
  categoryIds: number[];
}

interface RegionJobCategoryFormProps {
  initialData: FormData;
  onChange: (data: FormData, isValid: boolean) => void;
}

export default function RegionJobCategoryForm({
  initialData,
  onChange,
}: RegionJobCategoryFormProps) {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isDirty, setIsDirty] = useState({
    residenceId: false,
    job: false,
    categoryIds: false,
  });
  const jobErrorMessage = isDirty.job ? validateJob(formData.job) : null;
  const handleResidenceChange = (residenceId: number) => {
    setIsDirty({ ...isDirty, residenceId: true });
    const selected = RESIDENCE_OPTIONS.find(
      (option) => option.value === residenceId,
    );
    if (selected) {
      setFormData({
        ...formData,
        residenceId: selected.value,
      });
    }
  };

  const handleJobChange = (job: string) => {
    setIsDirty({ ...isDirty, job: true });
    setFormData({
      ...formData,
      job: job.trimEnd(),
    });
  };

  const handleCategorySelect = (categoryId: number) => {
    setIsDirty({ ...isDirty, categoryIds: true });
    setFormData({
      ...formData,
      categoryIds: [...formData.categoryIds, categoryId],
    });
  };

  const handleCategoryDelete = (categoryId: number) => {
    const newCategories = formData.categoryIds.filter(
      (id) => id !== categoryId,
    );
    setFormData({ ...formData, categoryIds: newCategories });
  };

  useEffect(() => {
    const isValid = Boolean(
      formData.residenceId && formData.job && isDirty.job && !jobErrorMessage,
    );

    onChange(formData, isValid);
  }, [formData, jobErrorMessage, isDirty, onChange]);

  useEffect(() => {
    if (formData.job) {
      setIsDirty((prevIsDirty) => ({ ...prevIsDirty, job: true }));
    }
  }, [formData.job, setIsDirty]);

  return (
    <div className="space-y-[2.9rem]">
      <Select
        id="residence"
        label="거주 지역"
        placeholder="지역 선택"
        options={RESIDENCE_OPTIONS}
        wrapperClassName="w-full"
        onChange={handleResidenceChange}
        value={
          RESIDENCE_OPTIONS.find(
            (option) => option.value === formData.residenceId,
          )?.label
        }
        highlight={true}
        labelClassName="font-custom-body1"
      />
      <JobInput
        className="w-full"
        onChange={handleJobChange}
        errorMessage={jobErrorMessage}
        defaultValue={formData.job}
      />
      <div className="space-y-[1.1rem]">
        <Select
          id="worry-category"
          label="관심 카테고리"
          placeholder="최대 4개 선택 가능"
          options={CATEGORY_OPTIONS.filter(
            (option) => !formData.categoryIds.includes(option.value),
          )}
          wrapperClassName="w-full"
          onChange={handleCategorySelect}
          readOnly={formData.categoryIds.length >= MAX_CATEGORIES_SELECT}
          labelClassName="font-custom-body1"
        />
        <div className="flex flex-wrap">
          {formData.categoryIds.map((categoryId) => (
            <Chip
              key={categoryId}
              label={
                CATEGORY_OPTIONS.find((option) => option.value === categoryId)
                  ?.label || ''
              }
              variant="delete"
              onDelete={() => handleCategoryDelete(categoryId)}
              className="mb-[0.6rem] mr-[0.6rem]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
