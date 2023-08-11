import { HTMLAttributes, memo } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  size: string;
}

export const Spacing = memo(function Spacing({
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
});
