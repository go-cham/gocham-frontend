import { twMergeCustom } from '@/libs/tw-merge';

interface InputWrapperProps {
  label: string;
  subLabel?: string;
  successMessage?: string | null;
  errorMessage?: string | null;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
}

export default function InputWrapper({
  label,
  subLabel,
  successMessage,
  errorMessage,
  className,
  labelClassName,
  children,
}: InputWrapperProps) {
  return (
    <div className={twMergeCustom('flex w-[34rem] flex-col', className)}>
      <div className="flex items-baseline space-x-[0.7rem]">
        <label
          className={twMergeCustom(
            'mb-[0.4rem] text-body1 text-gray-800',
            labelClassName
          )}
        >
          {label}
        </label>
        {subLabel && (
          <span className="text-body1 text-[#b0b2b8]">{subLabel}</span>
        )}
      </div>
      <div
        className={twMergeCustom(
          'group relative flex w-full space-x-[0.8rem] border-b-[0.2rem] border-custom-gray-500 py-[0.5rem] text-body4 focus-within:-mb-[0.2rem] focus-within:border-b-[0.4rem] focus-within:border-custom-gray-800',
          successMessage &&
            'border-custom-semantic-success-600 focus-within:border-custom-semantic-success-600',
          errorMessage &&
            'border-custom-semantic-warn-500 focus-within:border-custom-semantic-warn-500'
        )}
      >
        {children}
      </div>
      {(successMessage || errorMessage) && (
        <span
          className={twMergeCustom(
            'mt-[0.7rem] self-end text-body1',
            successMessage && 'text-custom-semantic-success-600',
            errorMessage && 'text-custom-semantic-warn-500'
          )}
        >
          {successMessage || errorMessage}
        </span>
      )}
    </div>
  );
}
