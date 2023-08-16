import { Snackbar } from '@/common/components/ui/modal';

interface UpdateBannerProps {
  applyUpdate: () => void;
}

export function UpdateBanner({ applyUpdate }: UpdateBannerProps) {
  return (
    <Snackbar
      text="새 버전으로 업데이트합니다."
      actionText="확인"
      className="absolute left-1/2 top-[8rem] z-50 -translate-x-1/2"
      onClick={applyUpdate}
    />
  );
}
