import { twMergeCustom } from '@/libs/tw-merge';

interface SnackbarProps {
  text: string;
  actionText?: string;
  onClick?: () => void;
  className?: string;
}

export default function Snackbar({
  text,
  actionText,
  onClick,
  className,
}: SnackbarProps) {
  return (
    <div
      className={twMergeCustom(
        'flex h-[4.3rem] w-[34rem] items-center rounded-[0.4rem] bg-custom-gray-800 px-[1.5rem] py-[1.1rem]',
        actionText ? 'justify-between' : 'justify-center',
        className
      )}
    >
      <span className="text-body4 text-white">{text}</span>
      {actionText && (
        <button className="text-body2 text-custom-main-500" onClick={onClick}>
          {actionText}
        </button>
      )}
    </div>
  );
}
