import { twMergeCustom } from '@/libs/tw-merge';

interface InputWrapperProps {
  label: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  children: React.ReactNode;
}

export default function InputWrapper({
  label,
  successMessage,
  errorMessage,
  className,
  children,
}: InputWrapperProps) {
  return (
    <div className={twMergeCustom('flex w-[34rem] flex-col', className)}>
      <label className="text-body1 text-gray-800">{label}</label>
      <div
        className={twMergeCustom(
          'group relative mt-[0.4rem] flex w-full space-x-[0.8rem] border-b-[0.2rem] py-[0.5rem] text-body4 focus-within:-mb-[0.2rem] focus-within:border-b-[0.4rem] focus-within:border-custom-gray-800',
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
