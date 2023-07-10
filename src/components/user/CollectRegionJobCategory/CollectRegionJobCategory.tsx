import { FormEvent, useEffect, useState } from 'react';

import useUser from '@/apis/hooks/users/useUser';
import JobInput from '@/components/register/form/JobInput';
import SelectFix from '@/components/ui/SelectFix';
import Button from '@/components/ui/buttons/Button';
import Chip from '@/components/ui/buttons/Chip';
import {
  OptionType,
  categoryOptions as initialCategoryOptions,
  residenceOptions,
} from '@/constants/Options';
import { validateJob } from '@/utils/validations/job';

const MAX_CATEGORIES_SELECT = 4;

interface CollectRegionJobCategoryProps {
  onSubmit?: (residenceId: number, job: string, categoryIds: number[]) => void;
  onChange?: (
    residence?: OptionType,
    job?: string,
    categories?: OptionType[]
  ) => void;
}

export default function CollectNicknameAgeGender({
  onSubmit,
  onChange,
}: CollectRegionJobCategoryProps) {
  const { user } = useUser();
  const [residence, setResidence] = useState<OptionType>();
  const [job, setJob] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>(
    initialCategoryOptions
  );
  const [categories, setCategories] = useState<OptionType[]>([]);
  const [isDirty, setIsDirty] = useState(false); // job

  const handleResidenceChange = (residence: string) => {
    const selected = residenceOptions.find(
      (option) => option.value === +residence
    );
    selected && setResidence(selected);
    selected && onChange && onChange(selected, job, categories);
  };

  const handleJobChange = (job: string) => {
    setIsDirty(true);
    setJob(job.trimEnd());
    onChange && onChange(residence, job, categories);
  };

  const handleCategorySelect = (category: string) => {
    const index = categoryOptions.findIndex(
      (option) => option.value === +category
    );
    if (index !== -1) {
      setCategories([...categories, categoryOptions[index]]);
      const newCategoryOptions = [...categoryOptions];
      newCategoryOptions.splice(index, 1);
      setCategoryOptions(newCategoryOptions);
      onChange &&
        onChange(residence, job, [...categories, categoryOptions[index]]);
    }
  };

  const handleCategoryDelete = (category: OptionType) => {
    const index = categories.findIndex((c) => c.value === category.value);
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);

    const newCategoryOptions = [...categoryOptions, category];
    newCategoryOptions.sort((a, b) => a.value - b.value);
    setCategoryOptions(newCategoryOptions);

    onChange && onChange(residence, job, newCategories);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!residence?.value) return;

    onSubmit &&
      onSubmit(
        residence.value,
        job,
        categories.map((cat) => cat.value)
      );
  };

  const jobErrorMessage = isDirty ? validateJob(job) : null;

  const nextEnabled = residence && job && !jobErrorMessage;

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.residence) {
      setResidence({
        value: user.residence.value,
        label: user.residence.label,
      });
    }
    if (user.worryCategories) {
      setCategories(
        initialCategoryOptions.filter((o) =>
          user.worryCategories?.map((cat) => cat.value).includes(o.value)
        )
      );
      const initialCategories =
        initialCategoryOptions.filter(
          (option) =>
            !user.worryCategories
              ?.map((cat) => cat.value)
              .includes(option.value)
        ) || [];
      setCategoryOptions(initialCategories);
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <form className="space-y-[2.9rem]" onSubmit={handleSubmit}>
      <SelectFix
        id="residence"
        label="거주 지역"
        placeholder="지역 선택"
        options={residenceOptions.map((v) => ({
          value: v.value + '',
          name: v.label,
        }))}
        wrapperClassName="w-full"
        onChange={handleResidenceChange}
        value={residence?.label}
        highlight={true}
      />
      <JobInput
        className="w-full"
        onChange={handleJobChange}
        errorMessage={jobErrorMessage}
        defaultValue={user?.job}
      />
      <div className="space-y-[1.1rem]">
        <SelectFix
          id="worry-category"
          label="관심 카테고리"
          placeholder="최대 4개 선택 가능"
          options={categoryOptions.map((v) => ({
            value: v.value + '',
            name: v.label,
          }))}
          wrapperClassName="w-full"
          onChange={handleCategorySelect}
          readonly={categories.length >= MAX_CATEGORIES_SELECT}
        />
        <div className="flex flex-wrap">
          {categories.map((category) => (
            <Chip
              key={category.value}
              label={
                initialCategoryOptions.find((o) => o.value === category.value)
                  ?.label || ''
              }
              variant="delete"
              onDelete={() => handleCategoryDelete(category)}
              className="mb-[0.6rem] mr-[0.6rem]"
            />
          ))}
        </div>
      </div>
      <Button
        disabled={!nextEnabled}
        className="absolute bottom-[4.8rem] left-1/2 -translate-x-1/2"
      >
        고참 시작하기
      </Button>
    </form>
  );
}
