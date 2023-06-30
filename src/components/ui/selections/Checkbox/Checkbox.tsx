import { ChangeEvent, useState } from 'react';
import { Control, UseFormRegisterReturn, useController } from 'react-hook-form';

import CheckIcon from '@/components/icons/CheckIcon';
import { twMergeCustom } from '@/libs/tw-merge';

interface CheckboxProps {
  id: string;
  register?: UseFormRegisterReturn;
  className?: string;
  name: string;
  control: Control<any, any>;
}

export default function Checkbox({
  id,
  register,
  className,
  name,
  control,
}: CheckboxProps) {
  const { field } = useController<Record<string, boolean>>({
    control,
    name,
  });
  const [checked, setChecked] = useState(field.value || false);

  console.log(field.value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked((prevChecked) => !prevChecked);
    field.onChange(e);
  };

  return (
    <label
      htmlFor={id}
      className={twMergeCustom(
        'flex h-[2.4rem] w-[2.4rem]  cursor-pointer items-center justify-center rounded-[0.3rem] border border-custom-background-200',
        checked && 'border-none bg-custom-main-500',
        className
      )}
    >
      <input
        {...register}
        id={id}
        checked={checked}
        type="checkbox"
        className="hidden"
        onChange={handleChange}
      />
      <CheckIcon color="white" className={checked ? 'visible' : 'hidden'} />
    </label>
  );
}
