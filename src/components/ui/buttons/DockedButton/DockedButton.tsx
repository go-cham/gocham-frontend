import Button from 'src/components/ui/buttons/Button';
import { twMerge } from 'tailwind-merge';

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
}: DockedButtonProps) {
  return (
    <div
      className={twMerge(
        'shadow-dock flex h-[11.2rem] w-[39rem] justify-center bg-white pt-[1.7rem]',
        backgroundClassName
      )}
    >
      <Button
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
