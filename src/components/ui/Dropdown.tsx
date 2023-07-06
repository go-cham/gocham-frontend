import { twMergeCustom } from '@/libs/tw-merge';

interface DropdownProps {
  options: { value: string; name: string }[];
  highlight?: boolean;
  onSelect?: (value: string) => void;
  value?: string;
  className?: string;
}

export default function Dropdown({
  options,
  highlight,
  onSelect,
  value,
  className,
}: DropdownProps) {
  return (
    <ul
      className={twMergeCustom(
        'absolute top-[6rem] z-10 mt-[0.5rem] max-h-[30rem] w-[15.5rem] space-y-[1.3rem] self-end overflow-y-scroll rounded-[0.7rem] bg-white pb-[0.7rem] pt-[1.1rem] shadow-dropdown',
        className
      )}
    >
      {options.map((option) => (
        <li
          key={option.value}
          className={twMergeCustom(
            'w-full cursor-pointer pr-[1.5rem] text-end text-body2 text-custom-gray-800',
            highlight && value === option.name && 'text-custom-main-600'
          )}
          onClick={() => onSelect && onSelect(option.value)}
        >
          {option.name}
        </li>
      ))}
    </ul>
  );
}
