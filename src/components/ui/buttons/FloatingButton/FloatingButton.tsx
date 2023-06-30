import Button from 'src/components/ui/buttons/Button';
import { twMerge } from 'tailwind-merge';

interface FloatingButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function FloatingButton({
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
