import { twMerge } from 'tailwind-merge';

import DeleteIcon from '@/common/components/icons/DeleteIcon';

interface ChipProps {
  label: string;
  variant?: 'default' | 'delete' | 'gray';
  onDelete?: () => void;
  className?: string;
}

export function Chip({
  label,
  variant = 'default',
  onDelete,
  className,
}: ChipProps) {
  return (
    <button
      className={twMerge(
        'flex cursor-auto items-center rounded-[5px] py-[0.7rem] pl-[1rem] font-system-body2',
        variant === 'gray'
          ? 'bg-background-voteBg-100 text-text-subTitle-700'
          : 'bg-mainSub-main-100 text-mainSub-main-500',

        variant === 'delete' ? 'pr-[0.6rem]' : 'pr-[1rem]',
        className,
      )}
    >
      {label}
      {variant === 'delete' && (
        <DeleteIcon
          onClick={onDelete}
          color="#ff7860"
          className="ml-[0.2rem] h-[1.7rem] w-[1.7rem] cursor-pointer"
        />
      )}
    </button>
  );
}
