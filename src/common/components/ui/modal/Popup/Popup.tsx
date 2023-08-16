import { Button } from '@/common/components/ui/buttons';

interface ModalProps {
  isOpen: boolean;
  text: string;
  subText?: string;
  onCancel?: () => void;
  buttonLabel: string;
  onClickButton?: () => void;
  useCancelIcon?: boolean;
  useCancelButton?: boolean;
}

export function Popup({
  isOpen,
  text,
  subText,
  onCancel,
  buttonLabel,
  onClickButton,
  useCancelIcon = false,
  useCancelButton = true,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="absolute left-0 top-0 z-[99] h-screen w-screen bg-black opacity-20" />
      <div className="absolute left-1/2 top-1/2 z-[999] flex w-[32.8rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[0.7rem] bg-white px-[1.1rem] py-[1.3rem]">
        {useCancelIcon && (
          <CloseIcon
            className="absolute right-0 top-0 mr-[1.1rem] mt-[1.3rem] cursor-pointer"
            onClick={onCancel}
          />
        )}
        <div className="text-center">
          <p className="mt-[3rem] whitespace-pre-wrap text-[#434343] font-custom-heading1">
            {text}
          </p>
          {subText && (
            <p className="m-[0.9rem] text-text-explain-500 font-system-body3">
              {subText}
            </p>
          )}
        </div>
        <div className="mt-[2.7rem] flex w-full space-x-[1rem]">
          {useCancelButton && (
            <Button
              onClick={onCancel}
              className="border border-background-dividerLine-300 bg-white text-text-explain-500 font-system-body4 hover:bg-white hover:brightness-95 active:bg-white active:brightness-95"
            >
              취소
            </Button>
          )}
          <Button className="font-system-body4" onClick={onClickButton}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </>
  );
}

function CloseIcon({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.464 6.53596C21.7203 6.79224 21.7203 7.20776 21.464 7.46404L7.46404 21.464C7.20776 21.7203 6.79224 21.7203 6.53596 21.464C6.27968 21.2078 6.27968 20.7922 6.53596 20.536L20.536 6.53596C20.7922 6.27968 21.2078 6.27968 21.464 6.53596Z"
        fill="#BDBDBD"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.53596 6.53596C6.79224 6.27968 7.20776 6.27968 7.46404 6.53596L21.464 20.536C21.7203 20.7922 21.7203 21.2078 21.464 21.464C21.2078 21.7203 20.7922 21.7203 20.536 21.464L6.53596 7.46404C6.27968 7.20776 6.27968 6.79224 6.53596 6.53596Z"
        fill="#BDBDBD"
      />
    </svg>
  );
}
