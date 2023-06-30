import { twMerge } from 'tailwind-merge';

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
      className={twMerge(
        'flex h-[4.7rem] w-[34rem] items-center justify-center rounded-[5px] text-body5 transition-all duration-200 disabled:bg-custom-gray-100 disabled:text-gray-400',
        variant === 'primary'
          ? 'bg-custom-main-500 text-white hover:bg-custom-main-600 active:bg-custom-main-600'
          : 'bg-custom-main-100 text-custom-main-500 hover:bg-custom-main-200 active:bg-custom-main-200',
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
