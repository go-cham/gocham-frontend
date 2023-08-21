import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import MessageIcon from '@/common/components/icons/MessageIcon';
import ShareIcon from '@/common/components/icons/ShareIcon';
import { Snackbar } from '@/common/components/ui/modal';
import { Post } from '@/features/posts/types/post';

interface PostDetailFooterProps {
  post: Post;
}

export function PostDetailFooter({ post }: PostDetailFooterProps) {
  const [showCopySnackbar, setShowCopySnackbar] = useState(false);
  const navigate = useNavigate();

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
    <div>
      <div className="my-[1.3rem] flex space-x-[0.7rem]">
        <button
          onClick={() => {
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
        className="cursor-pointer text-text-subTitle-700 font-system-body2"
        onClick={() => navigate(`/feed/${post.id}/comment`)}
      >
        댓글 {post.replyCount < 100 ? post.replyCount : '99+'}개 모두 보기
      </span>
      {showCopySnackbar && (
        <Snackbar
          className="absolute bottom-[9.5rem] left-1/2 w-[90%] -translate-x-1/2"
          text="게시물 링크가 복사되었어요!"
        />
      )}
    </div>
  );
}
