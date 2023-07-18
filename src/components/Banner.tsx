import Snackbar from '@/components/ui/modal/Snackbar';

interface BannerProps {
  show: boolean;
  applyUpdate: () => void;
}

export default function Banner({ show, applyUpdate }: BannerProps) {
  if (!show) {
    return null;
  }

  return (
    <Snackbar
      text="새 버전으로 업데이트합니다."
      actionText="확인"
      className="absolute left-1/2 top-[8rem] z-50 -translate-x-1/2"
      onClick={applyUpdate}
    />
  );
}
