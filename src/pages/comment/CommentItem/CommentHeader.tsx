import { useEffect, useState } from 'react';

import useDeleteComment from '@/apis/hooks/posts/useDeleteComment';
import PostUserProfile from '@/components/post/PostUserProfile';
import Popup from '@/components/ui/modal/Popup';
import { ADMIN_EMAIL } from '@/constants/admin';

interface CommentHeaderProps {
  email: string;
  nickname: string;
  age: number;
  choice: string | null;
  isWriter: boolean;
  isMyComment: boolean;
  commentId: number;
  onReport: () => void;
}

export default function CommentHeader({
  email,
  nickname,
  age,
  choice,
  isWriter,
  isMyComment,
  commentId,
  onReport,
}: CommentHeaderProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { deleteComment, isSuccess, error } = useDeleteComment();

  const handleDelete = () => {
    deleteComment(commentId);
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      alert('댓글이 정상적으로 삭제되었습니다.');
    }
    if (error) {
      alert('오류가 발생하였습니다.');
    }
  }, [isSuccess, error]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-[6px]">
        <PostUserProfile
          isAdmin={email === ADMIN_EMAIL}
          nickname={nickname}
          age={age}
        />
        {choice && (
          <div className="flex items-center space-x-[6px]">
            <div className="h-[0.3rem] w-[0.3rem] rounded-full bg-[#cccfd4]"></div>
            <span className="accent-text-subTitle-700 font-system-body1">
              {choice}
            </span>
          </div>
        )}
        {isWriter && (
          <span className="rounded-[15px] border border-[#676A72] px-[0.7rem] py-[0.5rem] text-[#676A72] font-system-caption">
            작성자
          </span>
        )}
      </div>
      {isMyComment ? (
        <div
          className="cursor-pointer text-text-explain-500 font-system-body2"
          onClick={() => setDeleteModalOpen(true)}
        >
          삭제
        </div>
      ) : (
        <div
          className="cursor-pointer text-text-explain-500 font-system-body2"
          onClick={onReport}
        >
          신고
        </div>
      )}
      <Popup
        isOpen={deleteModalOpen}
        text="댓글을 삭제하시겠습니까?"
        subText="이 작업은 실행 취소할 수 없습니다."
        buttonLabel="댓글 삭제"
        onCancel={() => setDeleteModalOpen(false)}
        onClickButton={handleDelete}
      />
    </div>
  );
}
