import Button from 'src/components/ui/buttons/Button';

import { twMergeCustom } from '@/libs/tw-merge';

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
      className={twMergeCustom('rounded-[2.35rem]', className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
