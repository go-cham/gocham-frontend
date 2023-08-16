import { twMerge } from 'tailwind-merge';
import { Button } from '@/common/components/ui/buttons';

interface FloatingButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function FloatingButton({
  children,
  className,
  onClick,
}: FloatingButtonProps) {
  return (
    <Button
      variant="primary"
      className={twMerge('rounded-[2.35rem]', className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
