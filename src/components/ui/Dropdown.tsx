import { twMergeCustom } from '@/libs/tw-merge';

interface DropdownProps {
  options: { value: string; name: string }[];
  highlight?: boolean;
  onSelect?: (index: number) => void;
  value?: string;
}

export default function Dropdown({
  options,
  highlight,
  onSelect,
  value,
}: DropdownProps) {
  return (
    <ul className="absolute top-[6rem] z-10 mt-[0.5rem] max-h-[30rem] w-[15.5rem] self-end overflow-y-scroll rounded-[0.7rem] border bg-white">
      {options.map((option, index) => (
        <li
          key={option.value}
          className={twMergeCustom(
            'w-full cursor-pointer py-[0.6rem] pr-[1.5rem] text-end text-body2 text-custom-gray-800 hover:bg-custom-background-100',
            highlight && value === option.name && 'text-custom-main-600'
          )}
          onClick={() => onSelect && onSelect(index)}
        >
          {option.name}
        </li>
      ))}
    </ul>
  );
}
