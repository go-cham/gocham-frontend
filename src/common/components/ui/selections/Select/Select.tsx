import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import DownIcon from '@/common/components/icons/DownIcon';
import Dropdown from '@/common/components/ui/Dropdown';

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
  id,
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
      className={twMerge('relative flex w-[34rem] flex-col', wrapperClassName)}
    >
      <span
        className={twMerge(
          'text-text-subTitle-700 font-custom-subheading',
          labelClassName,
        )}
      >
        {label}
      </span>
      <div
        id={id}
        tabIndex={-1}
        onClick={handleMenuToggle}
        className={twMerge(
          'mt-[0.3rem] flex cursor-pointer items-center justify-between border-b-[0.2rem] border-text-explain-500 pb-[0.2rem]',
          menuOpen && '-mb-[0.2rem] border-b-[0.4rem] border-text-subTitle-700',
          'focus:-mb-[0.2rem] focus:border-b-[0.4rem]',
          errorMessage && 'border-semantic-warn-500',
        )}
      >
        <span
          className={twMerge(
            'select-none text-text-subExplain-400 font-system-body4',
            value && 'text-text-title-900 font-system-body4',
            readOnly && 'text-text-explain-500',
          )}
        >
          {value || placeholder}
        </span>
        <DownIcon
          className={twMerge('h-[3.2rem] w-[3.2rem]', menuOpen && 'rotate-180')}
        />
      </div>
      {errorMessage && (
        <span className="mt-[0.5rem] self-end text-semantic-warn-500 font-system-body1">
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
