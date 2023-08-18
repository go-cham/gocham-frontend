import { twMerge } from 'tailwind-merge';
import { ReactComponent as Cancel } from './cancel.svg';

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
  const baseCN =
    'bg-mainSub-main-100 text-mainSub-main-500 flex items-center rounded-[5px] py-[0.7rem] px-[1rem] font-system-body2 w-fit';
  const grayCN = 'bg-background-voteBg-100 text-text-subTitle-700';

  return (
    <div
      className={twMerge(
        baseCN,
        variant === 'gray' && grayCN,
        variant === 'delete' && 'pr-[0.6rem]',
        className,
      )}
    >
      {label}
      {variant === 'delete' && (
        <button className={'ml-[0.2rem]'} onClick={onDelete}>
          <Cancel />
        </button>
      )}
    </div>
  );
}
