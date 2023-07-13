import { twMergeCustom } from '@/libs/tw-merge';

export interface ButtonProps {
  variant?: 'primary' | 'line';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  variant = 'primary',
  children,
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={twMergeCustom(
        'flex h-[4.7rem] w-[34rem] items-center justify-center rounded-[5px] text-body5 transition-all duration-200 disabled:bg-background-voteBg-100 disabled:text-gray-400',
        variant === 'primary'
          ? 'bg-mainSub-main-500 text-white hover:bg-mainSub-mainPush-600 active:bg-mainSub-mainPush-600'
          : 'bg-mainSub-main-100 text-mainSub-main-500 hover:bg-mainSub-mainPush-200 active:bg-mainSub-mainPush-200',
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
