import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDeletePost from '@/apis/hooks/posts/useDeletePost';
import useGetChoiceOptions from '@/apis/hooks/posts/useGetChoiceOptions';
import useUser from '@/apis/hooks/users/useUser';
import ClockIcon from '@/components/icons/ClockIcon';
import MessageIcon from '@/components/icons/MessageIcon';
import MoreIcon from '@/components/icons/MoreIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import PostUserProfile from '@/components/post/PostUserProfile';
import Dropdown from '@/components/ui/Dropdown';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Popup from '@/components/ui/modal/Popup';
import { selectedVoteOptionIdAtom } from '@/states/selectedVoteOption';
import { customColors } from '@/styles/colors';
import { Post } from '@/types/post';
import { calculateAgeFromBirthday } from '@/utils/date/calculateAge';
import { formatText } from '@/utils/formatText';
import { getRemainingTime } from '@/utils/getRemainingTime';

import PostVote from './PostVote';

interface PostDetailProps {
  post: Post;
}

enum MENU {
  Edit,
  Delete,
  Report,
}

export default function PostDetail({ post }: PostDetailProps) {
  const { choiceOptions } = useGetChoiceOptions(post.id);
  const navigate = useNavigate();
  const { user } = useUser();
  const [showMore, setShowMore] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { deletePost, error, isSuccess, isLoading } = useDeletePost();
  const selectedVoteOptionId = useAtomValue(selectedVoteOptionIdAtom);

  const handleClickMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const handleMoreSelect = (value: number) => {
    if (value === MENU.Edit) {
      navigate(`/feed/${post.id}/edit`);
    } else if (value === MENU.Delete) {
      if (getRemainingTime(post.expirationTime) === '마감됨') {
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

  const handleDeletePost = async () => {
    await deletePost(post.id);
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

  const images = post.worryFiles?.map((file) => file.url);
  const isSelected = choiceOptions?.find(
    (option) => option.id === selectedVoteOptionId
  );

  const voteOptions = choiceOptions
    ?.filter((option) => !!option.label)
    .map((option) => ({
      id: option.id,
      label: option.label as string,
      image: option.url || null,
    }));

  if (!user || !post) {
    return null;
  }

  const remainingTime = getRemainingTime(post.expirationTime);
  const isClosed = remainingTime === 'closed';

  return (
    <div
      className="flex flex-col border-b border-background-dividerLine-300 py-[1.3rem]"
      id={isSelected ? 'vote-selected' : ''}
    >
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      <div className="flex items-center justify-between px-[2.5rem]">
        <PostUserProfile
          nickname={post.user.nickname}
          age={calculateAgeFromBirthday(post.user.birthday)}
          color="gray"
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
      </div>
      <PostDetailContent
        title={post.title}
        content={post.content}
        images={images}
      />
      {remainingTime && <PostExpiration remainingTime={remainingTime} />}
      <PostVote
        userId={user.id}
        postId={post.id}
        options={voteOptions}
        isClosed={isClosed}
      />
      <div className="my-[1.3rem] flex space-x-[0.7rem] px-[2.5rem]">
        <button>
          <MessageIcon />
        </button>
        <button>
          <ShareIcon />
        </button>
      </div>
      <span
        className="cursor-pointer px-[2.5rem] text-text-subTitle-700 font-system-body2"
        onClick={() => navigate(`/feed/${post.id}/comment`)}
      >
        댓글 {post.replyCount}개 모두 보기
      </span>
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

export function PostDetailContent({
  title,
  content,
  images,
}: {
  title: string;
  content: string;
  images?: string[] | null;
}) {
  return (
    <div>
      <div className="px-[2.5rem]">
        <h1 className="mt-[1.3rem] font-system-heading1">{title}</h1>
        <p className="mt-[0.8rem] break-words text-text-subTitle-700 font-system-body3">
          {formatText(content)}
        </p>
      </div>
      <div className="mt-[1.7rem]">
        {images && images.length === 1 && (
          <img
            src={images[0]}
            alt={'게시글이미지'}
            className="mx-auto h-[29.3rem] w-[36rem] rounded-[0.5rem] object-cover"
          />
        )}
        {images && images.length > 1 && (
          <div
            className="flex space-x-[1.3rem] overflow-x-auto px-[1.5rem]"
            style={{
              scrollSnapType: 'x mandatory',
            }}
          >
            {images.map((image) => (
              <img
                key={image}
                src={image}
                alt={'게시글이미지'}
                className="h-[29.3rem] max-w-[29.3rem] rounded-[0.5rem] object-cover"
                style={{
                  scrollSnapAlign: 'center',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PostExpiration({ remainingTime }: { remainingTime: string }) {
  const isClosed = remainingTime === 'closed';
  return (
    <div className="mt-[1.5rem] flex items-center space-x-[5.67px] px-[2.5rem]">
      <ClockIcon
        color={isClosed ? customColors.text.explain['500'] : undefined}
      />
      {isClosed ? (
        <span className="text-text-explain-500 font-system-body2">
          투표가 마감되었어요
        </span>
      ) : (
        <span className="text-mainSub-main-500 font-system-body2">
          {remainingTime}
        </span>
      )}
    </div>
  );
}
