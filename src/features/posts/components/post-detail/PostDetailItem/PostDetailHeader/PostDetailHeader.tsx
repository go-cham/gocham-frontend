import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoreIcon from '@/common/components/icons/MoreIcon';
import Dropdown from '@/common/components/ui/Dropdown';
import LoadingSpinner from '@/common/components/ui/loading/LoadingSpinner';
import Popup from '@/common/components/ui/modal/Popup';
import { ADMIN_EMAIL } from '@/common/constants/admin';
import { calculateAgeFromBirthDate } from '@/common/utils/date/calculateAge';
import useDeletePost from '@/features/posts/queries/useDeletePost';
import { Post } from '@/features/posts/types/post';
import { getRemainingTime } from '@/features/posts/utils/get-remaining-time';
import UserProfile from '@/features/user/components/UserProfile';
import useUser from '@/features/user/queries/useUser';

enum MENU {
  Edit,
  Delete,
  Report,
}

interface PostDetailHeaderProps {
  post: Post;
}

export default function PostDetailHeader({ post }: PostDetailHeaderProps) {
  const { user } = useUser();
  const [showMore, setShowMore] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { mutate: deletePost, error, isSuccess, isLoading } = useDeletePost();
  const navigate = useNavigate();

  const handleClickMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const handleDeletePost = () => {
    deletePost(post.id);
  };

  const handleMoreSelect = (value: number) => {
    if (value === MENU.Edit) {
      navigate(`/feed/${post.id}/edit`);
    } else if (value === MENU.Delete) {
      if (getRemainingTime(post.expirationTime) === 'closed') {
        alert('투표가 종료된 게시물은 삭제하실 수 없습니다.');
        setShowMore(false);
        return;
      }
      setDeleteModalOpen(true);
    } else if (value === MENU.Report) {
      navigate(`/feed/${post.id}/report`);
    }

    setShowMore(false);
  };

  const isMyPost = user?.id === post.user.id;

  const options = isMyPost
    ? [
        {
          value: MENU.Edit,
          label: '게시물 수정',
        },
        { value: MENU.Delete, label: '게시물 삭제' },
      ]
    : [{ value: MENU.Report, label: '게시물 신고' }];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      alert('게시물이 정상적으로 삭제되었습니다.');
    }
    if (error) {
      alert('오류가 발생하였습니다.');
    }

    setShowMore(false);
  }, [error, isSuccess]);

  return (
    <div className="flex items-center justify-between">
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      <UserProfile
        nickname={post.user.nickname}
        age={calculateAgeFromBirthDate(post.user.birthDate)}
        isAdmin={post.user.email === ADMIN_EMAIL}
      />
      <div ref={ref} className="relative">
        <MoreIcon className="cursor-pointer" onClick={handleClickMore} />
        {showMore && (
          <Dropdown
            options={options}
            className="right-0 top-[2.9rem] mt-0"
            onSelect={handleMoreSelect}
          />
        )}
      </div>
      <Popup
        isOpen={deleteModalOpen}
        text="게시물을 삭제하시겠습니까?"
        subText="이 작업은 실행 취소할 수 없습니다."
        buttonLabel="게시물 삭제"
        onCancel={() => setDeleteModalOpen(false)}
        onClickButton={handleDeletePost}
      />
    </div>
  );
}
