import { Offline } from 'react-detect-offline';
import { Snackbar } from '@/common/components/ui/modal';

export function AlertOffline() {
  return (
    <Offline>
      <Snackbar
        className={'absolute bottom-[10rem] left-1/2 z-[100] -translate-x-1/2'}
        text={
          '고민의 참견 서비스에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.'
        }
      />
    </Offline>
  );
}
