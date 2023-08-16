import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useUnregister from '@/apis/hooks/users/useUnregister';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import PostVoteInput from '@/components/post/form/PostVoteInput';
import Button from '@/components/ui/buttons/Button';
import Popup from '@/components/ui/modal/Popup';
import withAuth from '@/components/withAuth';

function UnregisterPage() {
  const { user } = useUser();
  const [reason, setReason] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate: unregister, isSuccess, error } = useUnregister();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showError, setShowError] = useState(false);

  if (!user) {
    return null;
  }

  const handleInputChange = (txt: string) => {
    setReason(txt);
  };

  const errorMessage = validate();

  function validate() {
    if (!reason) {
      return '계정을 삭제하는 이유를 작성해주세요.';
    }
    if (reason.trim().length < 5) {
      return '최소 5자 이상 입력해주세요.';
    }
    if (reason.length >= 5) {
      return null;
    }
  }

  const handleUnregister = () => {
    unregister({
      userId: user.id,
      reason: reason.trim(),
    });
  };

  const handleButtonClick = () => {
    setShowError(true);
    if (errorMessage) {
      alert(errorMessage);
      const input = document.getElementById('unregister-input');
      if (input) {
        input.focus();
      }
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('token');
      queryClient.clear();
      alert(
        '탈퇴가 정상 처리되었습니다.\n고민이 있으면 언제든지 찾아와주세요!',
      );
      navigate('/');
    }
    if (error) {
      alert('오류가 발생하였습니다.');
    }
  }, [isSuccess]);

  return (
    <div>
      <TopAppBar title={'탈퇴하기'} />
      <div className="px-[1.5rem]">
        <p className="mt-[3.3rem] font-system-heading1">
          {user.nickname}님이 떠나신다니 너무 아쉬워요.
        </p>
        <p className="mt-[1.3rem] text-text-subTitle-700 font-system-body3">
          계정을 삭제해도 게시글, 댓글, 투표한 기록 등 모든 활동 정보는 그대로
          유지됩니다. 계정 삭제 후 재가입 할 경우 이전에 활동한 정보를 수정할 수
          없습니다.
        </p>
        <PostVoteInput
          id={'unregister-input'}
          placeholder="계정을 삭제하는 이유를 작성해주세요."
          maxLength={280}
          className="mt-[2.5rem] w-full"
          onChange={handleInputChange}
          hasError={showError && !!errorMessage}
          errorMessage={showError ? errorMessage : ''}
        />
      </div>
      <Button
        variant="line"
        className="absolute bottom-[4.8rem] left-1/2 -translate-x-1/2"
        onClick={handleButtonClick}
      >
        탈퇴하기
      </Button>
      <Popup
        isOpen={modalOpen}
        text="정말 탈퇴 하시겠습니까?"
        subText="이 작업은 실행 취소할 수 없습니다."
        buttonLabel="탈퇴하기"
        onCancel={() => setModalOpen(false)}
        onClickButton={handleUnregister}
      />
    </div>
  );
}
export default withAuth(UnregisterPage, { block: 'unauthenticated' });
