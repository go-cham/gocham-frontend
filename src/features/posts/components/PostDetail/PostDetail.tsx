import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate, useParams } from 'react-router-dom';

import ClockIcon from '@/common/components/icons/ClockIcon';
import MessageIcon from '@/common/components/icons/MessageIcon';
import MoreIcon from '@/common/components/icons/MoreIcon';
import ShareIcon from '@/common/components/icons/ShareIcon';
import { Dropdown, ImageFullScreen } from '@/common/components/ui';
import { LoadingSpinner } from '@/common/components/ui/loading';
import { Popup, Snackbar } from '@/common/components/ui/modal';
import { ADMIN_EMAIL } from '@/common/constants/admin';
import { POST_TYPE } from '@/common/constants/post-type';
import { Post } from '@/common/types/post';
import { calculateAgeFromBirthDate } from '@/common/utils/date/calculateAge';
import { formatText } from '@/common/utils/formatText';
import { getRemainingTime } from '@/common/utils/getRemainingTime';
import { useDeletePost, useGetPosts } from '@/features/posts/queries';
import { UserProfile } from '@/features/user/components/UserProfile';
import { useUser } from '@/features/user/queries/useUser';
import { useGetChoiceOptions } from '@/features/vote/queries';
import { selectedVoteOptionIdAtom } from '@/features/vote/states/selected-vote-option';
import { customColors } from '@/styles/colors';

import { PostVote } from './PostVote';

interface PostDetailProps {
  post: Post;
}

enum MENU {
  Edit,
  Delete,
  Report,
}

export function PostDetail({ post }: PostDetailProps) {
  const params = useParams();
  const { data: choiceOptions } = useGetChoiceOptions(post.id);
  const navigate = useNavigate();
  const { user } = useUser();
  const [showMore, setShowMore] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { mutate: deletePost, error, isSuccess, isLoading } = useDeletePost();
  const selectedVoteOptionId = useAtomValue(selectedVoteOptionIdAtom);
  const { posts } = useGetPosts({ userId: user?.id, type: POST_TYPE.MY });
  const [showCopySnackbar, setShowCopySnackbar] = useState(false);

  const handleClickMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
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

  const handleDeletePost = () => {
    deletePost(post.id);
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
      if (params.route === POST_TYPE.MY && posts?.length === 1) {
        navigate('/user');
      }
    }
    if (error) {
      alert('오류가 발생하였습니다.');
    }

    setShowMore(false);
  }, [error, isSuccess]);

  const images = post.worryFiles?.map((file) => file.url);
  const isSelected = choiceOptions?.find(
    (option) => option.id === selectedVoteOptionId,
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

  const handleShare = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/feed/${post.id}`;
    if (isMobile) {
      if (window.isSecureContext) {
        const shareData = {
          title: '스낵 컬쳐 투표 서비스, 고민의 참견',
          text: post.title,
          url,
        };
        navigator.share(shareData).catch((e) => console.error(e));
      } else {
        alert('HTTPS에서만 공유가 가능합니다!');
      }
    } else {
      if (window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
          setShowCopySnackbar(true);
          setTimeout(() => setShowCopySnackbar(false), 3000);
        });
      } else {
        alert('HTTPS에서만 복사가 가능합니다!');
      }
    }
  };

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
        <button
          onClick={() => {
            // setTimeout(() => {
            //   let el: HTMLElement | null = null;
            //   while (!el) {
            //     el = document.getElementById('comment-input');
            //   }
            //   el.focus();
            // }, 100);
            navigate(`/feed/${post.id}/comment`, {
              state: {
                focus: true,
              },
            });
          }}
        >
          <MessageIcon />
        </button>
        <button onClick={handleShare}>
          <ShareIcon />
        </button>
      </div>
      <span
        className="cursor-pointer px-[2.5rem] text-text-subTitle-700 font-system-body2"
        onClick={() => navigate(`/feed/${post.id}/comment`)}
      >
        댓글 {post.replyCount < 100 ? post.replyCount : '99+'}개 모두 보기
      </span>
      <Popup
        isOpen={deleteModalOpen}
        text="게시물을 삭제하시겠습니까?"
        subText="이 작업은 실행 취소할 수 없습니다."
        buttonLabel="게시물 삭제"
        onCancel={() => setDeleteModalOpen(false)}
        onClickButton={handleDeletePost}
      />
      {showCopySnackbar && (
        <Snackbar
          className="absolute bottom-[9.5rem] left-1/2 w-[90%] -translate-x-1/2"
          text="게시물 링크가 복사되었어요!"
        />
      )}
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
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const multipleImagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!multipleImagesRef.current) return;

    const allImages =
      multipleImagesRef.current?.querySelectorAll<HTMLImageElement>('img');
    Promise.all(
      Array.from(allImages)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            }),
        ),
    ).then(() => {
      if (multipleImagesRef.current) {
        multipleImagesRef.current.scrollTo({
          left: 0,
        });
        multipleImagesRef.current.style.opacity = '1';
      }
    });
  }, [multipleImagesRef.current]);

  return (
    <div>
      {zoomedImageIndex !== null && images && (
        <ImageFullScreen
          images={images}
          initialIndex={zoomedImageIndex}
          onClose={() => setZoomedImageIndex(null)}
        />
      )}
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
            ref={multipleImagesRef}
            className="flex space-x-[1.3rem] overflow-x-auto px-[1.5rem] opacity-0"
            style={{
              scrollSnapType: 'x mandatory',
            }}
          >
            {images.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={'게시글이미지'}
                className="h-[29.3rem] max-w-[29.3rem] cursor-pointer rounded-[0.5rem] object-cover"
                style={{
                  scrollSnapAlign: 'center',
                }}
                onClick={() => setZoomedImageIndex(index)}
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
