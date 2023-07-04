import { useState } from 'react';

import DownIcon from '@/components/icons/DownIcon';
import { twMergeCustom } from '@/libs/tw-merge';

interface SelectFixProps {
  id: string;
  label: string;
  placeholder: string;
  options: { value: string; name: string }[];
  errorMessage?: string | null;
  labelClassName?: string;
  wrapperClassName?: string;
  onChange?: (value: string) => void;
  value?: string;
  readonly?: boolean;
  highlight?: boolean;
}

export default function SelectFix({
  label,
  placeholder,
  options,
  errorMessage,
  labelClassName,
  wrapperClassName,
  onChange,
  value,
  readonly,
  highlight,
}: SelectFixProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    if (readonly) return;
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const handleSelect = (index: number) => {
    if (readonly) return;
    setMenuOpen(false);
    onChange && onChange(options[index].value);
  };

  return (
    <div
      className={twMergeCustom(
        'relative flex w-[34rem] flex-col',
        wrapperClassName
      )}
    >
      <span className={twMergeCustom('text-body1', labelClassName)}>
        {label}
      </span>
      <div
        onClick={handleMenuToggle}
        className={twMergeCustom(
          'mt-[0.3rem] flex cursor-pointer items-center justify-between border-b-[0.2rem] border-custom-text-500 pb-[0.2rem]',
          menuOpen && '-mb-[0.2rem] border-b-[0.4rem] border-custom-gray-800',
          errorMessage && 'border-custom-semantic-warn-500'
        )}
      >
        <span
          className={twMergeCustom(
            'select-none text-body3 text-custom-text-400',
            value && 'text-body4 text-custom-text-900'
          )}
        >
          {value || placeholder}
        </span>
        <DownIcon
          className={twMergeCustom(
            'h-[3.2rem] w-[3.2rem]',
            menuOpen && 'rotate-180'
          )}
        />
      </div>
      {errorMessage && (
        <span className="mt-[0.5rem] self-end text-body1 text-custom-semantic-warn-500">
          {errorMessage}
        </span>
      )}

      {/* menu dropdown */}
      {menuOpen && (
        <ul className="absolute top-[6rem] z-10 mt-[0.5rem] max-h-[30rem] w-[15.5rem] self-end overflow-y-scroll rounded-[0.7rem] border bg-white">
          {options.map((option, index) => (
            <li
              key={option.value}
              className={twMergeCustom(
                'w-full cursor-pointer py-[0.6rem] pr-[1.5rem] text-end text-body2 text-custom-gray-800 hover:bg-custom-background-100',
                highlight && value === option.name && 'text-custom-main-600'
              )}
              onClick={() => handleSelect(index)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
