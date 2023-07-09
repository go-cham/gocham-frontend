import Button from '@/components/ui/buttons/Button';

interface ModalProps {
  isOpen: boolean;
  text: string;
  subText?: string;
  onCancel?: () => void;
  buttonLabel: string;
  onClickButton?: () => void;
}

export default function Popup({
  isOpen,
  text,
  subText,
  onCancel,
  buttonLabel,
  onClickButton,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-[99] h-screen w-screen bg-black opacity-20" />
      <div className="absolute left-1/2 top-1/2 z-[999] flex w-[32.8rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[0.7rem] bg-white px-[1.1rem] py-[1.3rem]">
        <div className="text-center">
          <p className="mt-[3rem] whitespace-pre-wrap text-heading1">{text}</p>
          {subText && (
            <p className="mt-[0.9rem] text-body3 text-custom-text-500">
              {subText}
            </p>
          )}
        </div>
        <div className="mt-[2.7rem] flex w-full space-x-[1rem]">
          <Button
            onClick={onCancel}
            className="border border-custom-background-200 bg-white text-custom-text-500 hover:bg-white hover:brightness-95 active:bg-white active:brightness-95"
          >
            취소
          </Button>
          <Button onClick={onClickButton}>{buttonLabel}</Button>
        </div>
      </div>
    </>
  );
}
