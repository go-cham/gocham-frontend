import { ChangeEvent, useState } from 'react';

import CheckIcon from '@/components/icons/CheckIcon';
import { twMergeCustom } from '@/libs/tw-merge';

interface CheckboxProps {
  id: string;
  className?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({
  id,
  className,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={twMergeCustom(
        'flex h-[2.4rem] w-[2.4rem]  cursor-pointer items-center justify-center rounded-[0.3rem] border border-background-dividerLine-300',
        checked && 'border-none bg-mainSub-main-500',
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <CheckIcon color="white" className={checked ? 'visible' : 'hidden'} />
    </label>
  );
}
