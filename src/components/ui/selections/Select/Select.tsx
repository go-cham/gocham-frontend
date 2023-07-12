import { useEffect, useRef, useState } from 'react';

import DownIcon from '@/components/icons/DownIcon';
import Dropdown from '@/components/ui/Dropdown';
import { twMergeCustom } from '@/libs/tw-merge';

interface SelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: { value: number; label: string }[];
  errorMessage?: string | null;
  labelClassName?: string;
  wrapperClassName?: string;
  onChange?: (value: number) => void;
  value?: string;
  readOnly?: boolean;
  highlight?: boolean;
}

export default function Select({
  label,
  placeholder,
  options,
  errorMessage,
  labelClassName,
  wrapperClassName,
  onChange,
  value,
  readOnly,
  highlight,
}: SelectProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    if (readOnly) return;
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const handleSelect = (value: number) => {
    if (readOnly) return;
    setMenuOpen(false);
    onChange && onChange(value);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return (
    <div
      ref={ref}
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
        <Dropdown
          options={options}
          highlight={highlight}
          onSelect={handleSelect}
          value={value}
        />
      )}
    </div>
  );
}
