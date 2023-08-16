import { twMerge } from 'tailwind-merge';

interface DropdownProps {
  options: { value: number; label: string }[];
  highlight?: boolean;
  onSelect?: (value: number) => void;
  value?: string;
  className?: string;
}

export function Dropdown({
  options,
  highlight,
  onSelect,
  value,
  className,
}: DropdownProps) {
  return (
    <ul
      className={twMerge(
        'hide-scrollbar absolute top-[6rem] z-10 mt-[0.5rem] max-h-[13rem] w-[15.5rem] space-y-[1.3rem] self-end overflow-y-scroll rounded-[0.7rem] bg-white pb-[0.7rem] pt-[1.1rem] shadow-dropdown',
        className,
      )}
    >
      {options.map((option) => (
        <li
          key={option.value}
          className={twMerge(
            'w-full cursor-pointer pr-[1.5rem] text-end text-text-subTitle-700 font-system-body2',
            highlight && value === option.label && 'text-mainSub-main-500',
          )}
          onClick={() => onSelect && onSelect(option.value)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
}
