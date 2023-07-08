import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';

import useDeletePost from '@/apis/hooks/posts/useDeletePost';
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
  const { deletePost, error, isSuccess } = useDeletePost();

  const handleClickMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const handleMoreSelect = (value: string) => {
    if (value === 'edit') {
      console.log('게시물 수정');
    } else if (value === 'delete') {
      if (getRemainingTime(post.expirationTime) === '마감됨') {
        alert('투표가 종료된 게시물은 삭제하실 수 없습니다.');
        setShowMore(false);
        return;
      }
      setDeleteModalOpen(true);
    } else if (value === 'report') {
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

  return (
    <div className="flex flex-col border-b border-custom-background-200 py-[1.3rem]">
      <div className="flex items-center justify-between px-[2.5rem]">
        <PostUserProfile
          nickname={post.user.nickname}
          age={20} // TODO
          color="gray"
        />
        <div ref={ref} className="relative">
          <MoreIcon onClick={handleClickMore} />
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
      <PostExpiration expirationTime={post.expirationTime} />
      <PostVote post={post} />
      <div className="my-[1.3rem] flex space-x-[0.7rem] px-[2.5rem]">
        <MessageIcon />
        <ShareIcon />
      </div>
      <span
        className="px-[2.5rem] text-body2 text-custom-gray-800"
        onClick={() => navigate(`/feed/${post.id}/comment`)}
      >
        댓글 {post.replyCount}개 모두 보기
      </span>
      <Modal
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

function PostDetailContent({
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
        <h1 className="mt-[1.3rem] text-heading2">{title}</h1>
        <p className="mt-[0.8rem] break-words text-body3 text-custom-gray-800">
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
          <Carousel
            centerMode={true}
            emulateTouch={true}
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            showIndicators={false}
          >
            {images.map((image) => (
              <img
                key={image}
                src={image}
                alt={'게시글이미지'}
                className="h-[29.3rem] max-w-[29.3rem] rounded-[0.5rem] object-cover"
              />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}

function PostExpiration({ expirationTime }: { expirationTime: string | null }) {
  return (
    <div className="mt-[1.9rem] flex space-x-2 px-[2.5rem]">
      <img src={ClockIcon} alt={'마감시간'} />
      <span className="text-[1.2rem] font-medium text-primary">
        {getRemainingTime(expirationTime)}
      </span>
    </div>
  );
}
