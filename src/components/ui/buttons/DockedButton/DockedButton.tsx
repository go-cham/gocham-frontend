import { twMerge } from 'tailwind-merge';

import Button from '@/components/ui/buttons/Button';
import { ButtonProps } from '@/components/ui/buttons/Button/Button';

interface DockedButtonProps extends ButtonProps {
  backgroundClassName?: string;
  buttonClassName?: string;
}

export default function DockedButton({
  variant = 'primary',
  onClick,
  children,
  disabled = false,
  backgroundClassName,
  buttonClassName,
  type,
}: DockedButtonProps) {
  return (
    <div
      className={twMerge(
        'shadow-dock flex h-[11.2rem] w-[39rem] justify-center bg-white pt-[1.7rem]',
        backgroundClassName,
      )}
    >
      <Button
        type={type}
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        className={twMerge('w-[34rem]', buttonClassName)}
      >
        {children}
      </Button>
    </div>
  );
}
