import Button from '@/components/ui/Button';
import { ButtonProps } from '@/components/ui/Button/Button';

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
      className={`flex h-[11.2rem] w-[39rem] justify-center bg-white pt-[1.7rem] shadow-dock ${backgroundClassName}`}
    >
      <Button
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        className={`w-[34rem] ${buttonClassName}`}
      >
        {children}
      </Button>
    </div>
  );
}
