import { twMerge } from 'tailwind-merge';

interface InputWrapperProps {
  label: string;
  subLabel?: string;
  successMessage?: string | null;
  errorMessage?: string | null;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
}

export function InputWrapper({
  label,
  subLabel,
  successMessage,
  errorMessage,
  className,
  labelClassName,
  children,
}: InputWrapperProps) {
  return (
    <div className={twMerge('re relative flex w-[34rem] flex-col', className)}>
      <div className="flex items-baseline space-x-[0.7rem]">
        <label
          className={twMerge(
            'mb-[0.4rem] text-text-subTitle-700 font-custom-subheading',
            labelClassName,
          )}
        >
          {label}
        </label>
        {subLabel && (
          <span className="text-[#b0b2b8] font-system-body1">{subLabel}</span>
        )}
      </div>
      <div
        className={twMerge(
          'group relative flex w-full space-x-[0.8rem] border-b-[0.2rem] border-text-explain-500 py-[0.5rem] font-system-body4 focus-within:-mb-[0.2rem] focus-within:border-b-[0.4rem] focus-within:border-text-subTitle-700',
          successMessage &&
            'border-semantic-success-600 focus-within:border-semantic-success-600',
          errorMessage &&
            'border-semantic-warn-500 focus-within:border-semantic-warn-500',
        )}
      >
        {children}
      </div>
      {(successMessage || errorMessage) && (
        <span
          className={twMerge(
            'absolute -bottom-[2.1rem] right-0 font-system-body1',
            successMessage && 'text-semantic-success-600',
            errorMessage && 'text-semantic-warn-500',
          )}
        >
          {successMessage || errorMessage}
        </span>
      )}
    </div>
  );
}
