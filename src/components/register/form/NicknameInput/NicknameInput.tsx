import TextInput from '@/components/ui/inputs/TextInput';

interface NicknameInputProps {
  onChange?: (nickname: string) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
  className?: string;
}

export default function NicknameInput({
  onChange,
  successMessage,
  errorMessage,
  className,
}: NicknameInputProps) {
  return (
    <TextInput
      label="닉네임"
      placeholder="한글, 영어, 숫자 포함 최대 10자"
      onChange={onChange}
      className={className}
      successMessage={successMessage}
      errorMessage={errorMessage}
      maxLength={10}
    />
  );
}
