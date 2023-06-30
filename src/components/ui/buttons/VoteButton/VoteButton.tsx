import CheckIcon from '@/components/icons/CheckIcon';
import Button from '@/components/ui/buttons/Button';
import { twMergeCustom } from '@/libs/tw-merge';

interface VoteButtonProps {
  children: React.ReactNode;
  selected: boolean;
  image?: string;
  onClick: () => void;
  className?: string;
}

export default function VoteButton({
  children,
  selected,
  image,
  onClick,
  className,
}: VoteButtonProps) {
  return (
    <Button
      className={twMergeCustom(
        'border border-custom-background-200 shadow-header',
        image ? 'justify-between overflow-hidden' : 'justify-start',
        selected
          ? 'bg-custom-background-100 text-custom-text-900 hover:bg-custom-background-100 active:bg-custom-background-100'
          : 'bg-white text-custom-gray-600 hover:bg-white active:bg-white',
        className
      )}
      onClick={onClick}
    >
      <div className="flex">
        <CheckIcon
          color={selected ? '#222222' : undefined}
          className="ml-[0.8rem] mr-[0.6rem]"
        />
        {children}
      </div>
      {image && (
        <img src={image} alt="선택지 이미지" className="aspect-square h-full" />
      )}
    </Button>
  );
}
