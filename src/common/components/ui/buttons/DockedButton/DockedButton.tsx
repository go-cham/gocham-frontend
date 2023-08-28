import { twMerge } from 'tailwind-merge';
import { ButtonProps } from '@/common/components/ui/buttons/Button';
import Button from '@/common/components/ui/buttons/Button';

interface DockedButtonProps extends ButtonProps {
  backgroundClassName?: string;
  buttonClassName?: string;
}

export default function DockedButton({
  variant = 'primary',
  children,
  backgroundClassName,
  buttonClassName,
  ...props
}: DockedButtonProps) {
  return (
    <div
      className={twMerge(
        'shadow-dock flex h-[11.2rem] w-[39rem] justify-center bg-white pt-[1.7rem]',
        backgroundClassName,
      )}
    >
      <Button
        variant={variant}
        className={twMerge('w-[34rem]', buttonClassName)}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}
