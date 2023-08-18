import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'line';
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseCN =
    'flex h-[4.7rem] w-[34rem] items-center justify-center rounded-[5px] font-system-heading2 disabled:bg-background-voteBg-100 disabled:text-gray-400';
  const primaryCN =
    'bg-mainSub-main-500 text-white hover:bg-mainSub-mainPush-600 active:bg-mainSub-mainPush-600';
  const lineCN =
    'bg-mainSub-main-100 text-mainSub-main-500 hover:bg-mainSub-mainPush-200 active:bg-mainSub-mainPush-200';
  const buttonCN = twMerge(
    baseCN,
    variant === 'primary' ? primaryCN : lineCN,
    className,
  );

  return (
    <button className={buttonCN} {...props}>
      {children}
    </button>
  );
}
