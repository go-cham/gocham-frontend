import { twMerge } from 'tailwind-merge';

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <div
      className={twMerge(
        'h-[1px] w-full bg-background-dividerLine-300',
        className,
      )}
    />
  );
}
