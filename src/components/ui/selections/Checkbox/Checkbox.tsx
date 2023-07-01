import { ChangeEvent, useState } from 'react';
import {
  Control,
  RegisterOptions,
  UseFormRegisterReturn,
  useController,
} from 'react-hook-form';

import CheckIcon from '@/components/icons/CheckIcon';
import { twMergeCustom } from '@/libs/tw-merge';
import { ReactHookFormInputProps } from '@/types/react-hook-form';

interface CheckboxProps extends ReactHookFormInputProps {
  id: string;
  register?: UseFormRegisterReturn;
  className?: string;
}

export default function Checkbox({
  id,
  register,
  className,
  name,
  control,
  rules,
}: CheckboxProps) {
  const { field } = useController<Record<string, boolean>>({
    control,
    name,
    rules: rules,
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
