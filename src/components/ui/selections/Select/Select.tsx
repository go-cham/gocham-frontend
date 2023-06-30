import { useEffect, useRef, useState } from 'react';
import { Control, useController } from 'react-hook-form';

import DownIcon from '@/components/icons/DownIcon';
import { twMergeCustom } from '@/libs/tw-merge';

interface SelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: { value: string; name: string }[];
  error?: string | null;
  name: string;
  control: Control<any, any>;
  labelClassName?: string;
  wrapperClassName?: string;
}

export default function Select({
  id,
  label,
  placeholder,
  options,
  error,
  name,
  control,
  labelClassName,
  wrapperClassName,
}: SelectProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const { field } = useController<Record<string, string>>({
    control,
    name,
  });
  const defaultValue = field.value
    ? options.findIndex((option) => option.value === field.value)
    : null;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    defaultValue
  );

  const handleMenuToggle = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const handleSelect = (index: number) => {
    setMenuOpen(false);
    setSelectedIndex(index);
  };

  useEffect(() => {
    selectRef.current?.dispatchEvent(new Event('change', { bubbles: true }));
  }, [selectedIndex]);

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
          error && 'border-custom-semantic-warn-500'
        )}
      >
        <span
          className={twMergeCustom(
            'select-none text-body3 text-custom-text-400',
            selectedIndex !== null && 'text-body4 text-custom-text-900'
          )}
        >
          {selectedIndex !== null ? options[selectedIndex].name : placeholder}
        </span>
        <DownIcon
          className={twMergeCustom(
            'h-[3.2rem] w-[3.2rem]',
            menuOpen && 'rotate-180'
          )}
        />
      </div>
      {error && (
        <span className="mt-[0.5rem] self-end text-body1 text-custom-semantic-warn-500">
          {error}
        </span>
      )}

      {/* menu dropdown */}
      {menuOpen && (
        <ul className="absolute top-[6rem] mt-[0.5rem] w-[15.5rem] self-end overflow-hidden rounded-[0.7rem] border bg-white">
          {options.map((option, index) => (
            <li
              key={option.value}
              className="w-full cursor-pointer py-[0.6rem] pr-[1.5rem] text-end text-body2 text-custom-gray-800 hover:bg-custom-background-100"
              onClick={() => handleSelect(index)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}

      <select
        ref={selectRef}
        id={id}
        className="hidden"
        onChange={field.onChange}
        value={
          selectedIndex !== null ? options[selectedIndex].value : undefined
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
