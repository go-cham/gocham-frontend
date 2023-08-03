import { twMerge } from 'tailwind-merge';

interface SnackbarProps {
  text?: string;
  children?: React.ReactNode;
  actionText?: string;
  onClick?: () => void;
  className?: string;
}

export default function Snackbar({
  text,
  children,
  actionText,
  onClick,
  className,
}: SnackbarProps) {
  return (
    <div
      className={twMerge(
        'flex w-[34rem] items-center rounded-[0.4rem] bg-text-subTitle-700 px-[1.5rem] py-[1.1rem]',
        actionText ? 'justify-between' : 'justify-center',
        className
      )}
    >
      <span className="text-white font-system-body4">{text || children}</span>
      {actionText && (
        <button
          className="whitespace-nowrap text-mainSub-main-500 font-system-body2"
          onClick={onClick}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
