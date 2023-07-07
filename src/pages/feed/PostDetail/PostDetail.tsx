import { navigate } from '@storybook/addon-links';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '@/apis/hooks/users/useUser';
import MessageIcon from '@/components/icons/MessageIcon';
import MoreIcon from '@/components/icons/MoreIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import PostUserProfile from '@/components/post/PostUserProfile';
import Dropdown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import ClockIcon from '@/images/PostComponent/clock.svg';
import { Post } from '@/types/post';
import { formatText } from '@/utils/formatText';
import { getRemainingTime } from '@/utils/getRemainingTime';

import PostVote from './PostVote';

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showMore, setShowMore] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClickMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const handleMoreSelect = (value: string) => {
    if (value === 'edit') {
      console.log('게시물 수정');
    } else if (value === 'delete') {
      setDeleteModalOpen(true);
    } else if (value === 'report') {
      navigate(`/feed/${post.id}/report`);
    }

    setShowMore(false);
  };

  const isMyPost = user?.id === post.user.id;
  const options = isMyPost
    ? [
        {
          value: 'edit',
          name: '게시물 수정',
        },
        { value: 'delete', name: '게시물 삭제' },
      ]
    : [{ value: 'report', name: '게시물 신고' }];

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

  return (
    <div className="flex flex-col border-b border-custom-background-200 px-[2.5rem] py-[1.3rem]">
      <div className="flex items-center justify-between">
        <PostUserProfile
          nickname={post.user.nickname}
          age={20} // TODO
          color="gray"
        />
        <div ref={ref} className="relative">
          <MoreIcon onClick={handleClickMore} />
          {/*<div ref={ref}>*/}
          {showMore && (
            <Dropdown
              options={options}
              className="right-0 top-[2.9rem] mt-0"
              onSelect={handleMoreSelect}
            />
          )}
          {/*</div>*/}
        </div>
      </div>
      <PostDetailContent
        title={post.title}
        content={post.content}
        image={post.worryFiles[0]?.url}
      />
      <PostExpiration expirationTime={post.expirationTime} />
      <PostVote post={post} />
      <div className="my-[1.3rem] flex space-x-[0.7rem]">
        <MessageIcon />
        <ShareIcon />
      </div>
      <span className="text-body2 text-custom-gray-800">
        댓글 {post.replyCount}개 모두 보기
      </span>
      <Modal
        isOpen={deleteModalOpen}
        text="게시물을 삭제하시겠습니까?"
        subText="이 작업은 실행 취소할 수 없습니다."
        buttonLabel="게시물 삭제"
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}

function PostDetailContent({
  title,
  content,
  image,
}: {
  title: string;
  content: string;
  image?: string | null;
}) {
  return (
    <div>
      <h1 className="mt-[1.3rem] text-heading2">{title}</h1>
      <p className="mt-[0.8rem] break-words text-body3 text-custom-gray-800">
        {formatText(content)}
      </p>
      {image && (
        <img
          src={image}
          alt={'게시글이미지'}
          className="mx-auto mt-[1.7rem] max-h-[20.25rem] object-contain"
        />
      )}
    </div>
  );
}

function PostExpiration({ expirationTime }: { expirationTime: string | null }) {
  return (
    <div className="mt-[1.9rem] flex space-x-2">
      <img src={ClockIcon} alt={'마감시간'} />
      <span className="text-[1.2rem] font-medium text-primary">
        {getRemainingTime(expirationTime)}
      </span>
    </div>
  );
}
