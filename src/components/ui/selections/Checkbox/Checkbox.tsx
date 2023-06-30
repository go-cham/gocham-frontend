import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import CheckIcon from '@/components/icons/CheckIcon';

interface CheckboxProps {
  id: string;
  defaultChecked: boolean;
  register?: UseFormRegisterReturn;
  className?: string;
}

export default function Checkbox({
  id,
  defaultChecked,
  register,
  className,
}: CheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <label
      htmlFor={id}
      className={twMerge(
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
