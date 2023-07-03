import { ChangeEvent, useState } from 'react';

import CheckIcon from '@/components/icons/CheckIcon';
import { twMergeCustom } from '@/libs/tw-merge';

interface CheckboxProps {
  id: string;
  className?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({
  id,
  className,
  defaultChecked = false,
  onChange,
}: CheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    onChange && onChange(newChecked);
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
        id={id}
        type="checkbox"
        className="hidden"
        onChange={handleChange}
        checked={checked}
      />
      <CheckIcon color="white" className={checked ? 'visible' : 'hidden'} />
    </label>
  );
}
