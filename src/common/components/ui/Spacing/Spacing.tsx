import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  size: string;
}

export default function Spacing({
  direction = 'vertical',
  size,
  ...props
}: Props) {
  return (
    <div
      style={{
        flex: 'none',
        width: direction === 'horizontal' ? `${size}` : undefined,
        height: direction === 'vertical' ? `${size}` : undefined,
      }}
      {...props}
    />
  );
}
