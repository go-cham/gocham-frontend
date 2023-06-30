import Button from 'src/components/ui/buttons/Button';

import PlusIcon from '@/components/icons/PlusIcon';
import { ButtonProps } from '@/components/ui/buttons/Button/Button';
import { twMergeCustom } from '@/libs/tw-merge';

export default function EditButton({
  disabled,
  onClick,
  className,
  children,
}: Partial<ButtonProps>) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={twMergeCustom(
        'border border-custom-background-200 bg-white text-custom-text-500 hover:bg-white active:bg-white disabled:bg-custom-background-100 disabled:text-custom-text-400',
        className
      )}
    >
      <PlusIcon
        className="mr-[0.3rem] h-[1.8rem] w-[1.8rem]"
        color={disabled ? '#bdbdbd' : undefined}
      />
      {children}
    </Button>
  );
}
