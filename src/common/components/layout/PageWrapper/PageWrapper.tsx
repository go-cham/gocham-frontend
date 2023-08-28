import { twMerge } from 'tailwind-merge';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={twMerge('flex h-full flex-col', className)}>{children}</div>
  );
}
