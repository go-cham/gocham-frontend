import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate, useParams } from 'react-router-dom';
import MoreIcon from '@/common/components/icons/MoreIcon';
import PageWrapper from '@/common/components/layout/PageWrapper';
import TopAppBar from '@/common/components/layout/TopAppBar';
import Divider from '@/common/components/ui/Divider';
import Dropdown from '@/common/components/ui/Dropdown';
import ImageFullScreen from '@/common/components/ui/ImageFullScreen';
import Popup from '@/common/components/ui/modal/Popup';
import Snackbar from '@/common/components/ui/modal/Snackbar';
import CommentSkeleton from '@/common/components/ui/skeleton/CommentSkeleton';
import PostSummarySkeleton from '@/common/components/ui/skeleton/PostSummarySkeleton';
import { ADMIN_EMAIL } from '@/common/constants/admin';
import { calculateAgeFromBirthDate } from '@/common/utils/date/calculateAge';
import { isIOS } from '@/common/utils/environment';
import CommentInput from '@/features/comments/components/CommentInput';
import CommentList from '@/features/comments/components/CommentList';
import useAddComment from '@/features/comments/queries/useAddComment';
import useGetComments from '@/features/comments/queries/useGetComments';
import { commentStateAtom } from '@/features/comments/states/comment';
import PostDetailContent from '@/features/posts/components/post-detail/PostDetailItem/PostDetailContent';
import useDeletePost from '@/features/posts/queries/useDeletePost';
import useGetPost from '@/features/posts/queries/useGetPost';
import { getRemainingTime } from '@/features/posts/utils/get-remaining-time';
import UserProfile from '@/features/user/components/UserProfile';
import useUser from '@/features/user/queries/useUser';
import ImageList from '@/pages/comment/components/ImageList';

enum MENU {
  Edit,
  Delete,
  Report,
}

export default function CommentPage() {
  const [commentState, setCommentState] = useAtom(commentStateAtom);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { user } = useUser();
  const { id } = useParams();
  const postId = Number(id);
  const { data: comments, isLoading: commentLoading } = useGetComments(postId);
  const { data: post } = useGetPost(postId);
  const {
    mutate: deletePost,
    error: deletePostError,
    isSuccess: deletePostSuccess,
  } = useDeletePost();
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const { mutate: addComment, isSuccess, error, data } = useAddComment(postId);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const initialSizeRef = useRef<number | null>(null);

  const handleDropdownSelect = (value: number) => {
    if (value === MENU.Report) {
      navigate(`/feed/${post?.id}/report`);
    }
    if (value === MENU.Edit) {
      navigate(`/feed/${post?.id}/edit`);
    }
    if (value == MENU.Delete) {
      if (post) {
        if (getRemainingTime(post.expirationTime) === 'closed') {
          alert('투표가 종료된 게시물은 삭제하실 수 없습니다.');
          setShowMore(false);
          return;
        }
      }
      setDeleteModalOpen(true);
    }
  };

  const handleSubmit = () => {
    const el = document.getElementById('comment-input');
    if (el && user) {
      const rawContent = el.textContent as string;

      const regex = /^@([A-Za-z가-힣0-9]+)\s((.|\n)*)/;
      const matches = rawContent.match(regex);

      let content = '';
      let nickname = '';
      if (matches) {
        nickname = matches[1].trimEnd();
        content = matches[2].trimEnd();
      } else {
        content = rawContent.trimEnd();
      }

      const isReply =
        nickname && nickname === commentState.replyingTo?.nickname;

      if (commentState.postId && content) {
        addComment({
          userId: user.id,
          content,
          worryId: commentState.postId,
          mentionUserId: isReply ? commentState.replyingTo?.id || null : null,
          mentionUserNickname: isReply
            ? commentState.replyingTo?.nickname || null
            : null,
          nestingReplyId: isReply ? commentState.parentCommentId : null,
        });
      }
    }
  };

  useEffect(() => {
    if (deletePostSuccess) {
      alert('게시물이 정상적으로 삭제되었습니다.');
      setDeleteModalOpen(false);
      navigate(-1);
    }
    if (deletePostError) {
      alert('오류가 발생하였습니다.');
    }
    setShowMore(false);
  }, [error, deletePostSuccess, deletePostError, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMore(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCommentState((prevState) => ({
      ...prevState,
      postId: postId || null,
    }));

    return () => {
      setCommentState((prevState) => ({
        ...prevState,
        postId: null,
      }));
    };
  }, [postId, setCommentState]);

  useEffect(() => {
    if (isSuccess && data) {
      const commentInput = document.getElementById('comment-input');
      if (!commentInput) return;
      commentInput.innerHTML = '';
      setCommentState((prevCommentState) => ({
        ...prevCommentState,
        inputActive: false,
      }));
    } else if (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        if (error.response.data.errorCode === 'IS_BAD_WORD') {
          const el = document.getElementById('comment-input');
          setShowErrorSnackbar(true);
          setTimeout(() => {
            setShowErrorSnackbar(false);
          }, 3000);
          el?.focus();
        }
      }
    }
  }, [isSuccess, error, data, setCommentState]);

  useEffect(() => {
    if (!initialSizeRef.current && window.visualViewport) {
      initialSizeRef.current = window.visualViewport.height;
    }

    const handleResize = () => {
      if (!isMobile) return;
      if (!window.visualViewport || !initialSizeRef.current) return;

      if (isIOS()) {
        const currentHeight = window.visualViewport.height;
        const diff = initialSizeRef.current - currentHeight;
        if (currentHeight < initialSizeRef.current) {
          document.body.style.marginTop = diff + 'px';
        } else {
          document.body.style.marginTop = '0px';
        }
        document.body.style.height = currentHeight + 'px';
      } else {
        const currentHeight = window.visualViewport.height;
        document.body.style.height = currentHeight + 'px';
      }
    };

    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      if (window.visualViewport) {
        document.body.style.marginTop = '0px';
        document.body.style.height = initialSizeRef.current + 'px';
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <PageWrapper>
      <TopAppBar title="댓글" />
      <div
        id="comment-page"
        className="hide-scrollbar flex-1 overflow-y-scroll overscroll-y-auto"
      >
        <div className="flex flex-col px-[2.5rem] pb-[1.9rem] pt-[2.1rem]">
          {post && user ? (
            <>
              <div className="flex items-center justify-between">
                <UserProfile
                  nickname={post.user.nickname}
                  age={calculateAgeFromBirthDate(post.user.birthDate)}
                  isAdmin={post.user.email === ADMIN_EMAIL}
                />
                <div className="relative" ref={dropdownRef}>
                  <MoreIcon
                    className="cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                  />
                  {showMore && (
                    <Dropdown
                      options={
                        user.id === post.user.id
                          ? [
                              { value: MENU.Edit, label: '게시물 수정' },
                              { value: MENU.Delete, label: '게시물 삭제' },
                            ]
                          : [{ value: MENU.Report, label: '게시물 신고' }]
                      }
                      onSelect={handleDropdownSelect}
                      className="right-0 top-[2.9rem] mt-0"
                    />
                  )}
                </div>
              </div>
              <PostDetailContent
                title={post.title}
                content={post.content}
                images={[]}
              />
              <ImageList
                images={post.worryFiles.map((file) => file.url)}
                onClick={(index) => setZoomedImageIndex(index)}
              />
              {zoomedImageIndex !== null && (
                <ImageFullScreen
                  images={post.worryFiles.map((file) => file.url)}
                  initialIndex={zoomedImageIndex}
                  onClose={() => setZoomedImageIndex(null)}
                />
              )}
            </>
          ) : (
            <PostSummarySkeleton />
          )}
        </div>
        <Divider />
        {comments && post ? (
          <CommentList writerId={post.user.id} comments={comments} />
        ) : (
          commentLoading &&
          Array(10)
            .fill(null)
            .map((_, i) => <CommentSkeleton key={i} />)
        )}
      </div>
      <CommentInput onSubmit={handleSubmit} />
      {showErrorSnackbar && (
        <Snackbar
          text="금칙어 입력이 불가합니다."
          className="absolute bottom-[8rem] left-1/2 -translate-x-1/2"
        />
      )}
      {post && (
        <Popup
          isOpen={deleteModalOpen}
          text="게시물을 삭제하시겠습니까?"
          subText="이 작업은 실행 취소할 수 없습니다."
          buttonLabel="게시물 삭제"
          onCancel={() => setDeleteModalOpen(false)}
          onClickButton={() => deletePost(post.id)}
        />
      )}
    </PageWrapper>
  );
}
