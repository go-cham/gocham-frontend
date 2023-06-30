import Button from '@/components/ui/Button';

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
      className={`rounded-[2.35rem] ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
