import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useDeletePost from '@/apis/hooks/posts/useDeletePost';
import useGetComments from '@/apis/hooks/posts/useGetComments';
import useGetPost from '@/apis/hooks/posts/useGetPost';
import useUser from '@/apis/hooks/users/useUser';
import MoreIcon from '@/components/icons/MoreIcon';
import TopAppBar from '@/components/layout/TopAppBar';
import PostUserProfile from '@/components/post/PostUserProfile';
import Dropdown from '@/components/ui/Dropdown';
import Popup from '@/components/ui/modal/Popup/Popup';
import { calculateAgeFromBirthday } from '@/utils/date/calculateAge';

import CommentBox from './CommentBox';
import CommentInputWrapper from './CommentInputWrapper';
import { PostDetailContent } from './PostDetail/PostDetail';

export default function FeedCommentPage() {
  const [showMore, setShowMore] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleClickMore = () => [setShowMore((prev) => !prev)];
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useGetComments(Number(id));
  const { post, isLoading, error } = useGetPost(Number(id));
  const {
    user,
    isLoading: useUserLoading,
    error: useUserError,
    status,
  } = useUser();
  const age = post ? calculateAgeFromBirthday(post?.user.birthDate) : -1;
  const [addChildComment, setAddChildComment] = useState({
    addChild: false,
    nestingReplyId: -1,
    nickName: '',
  });
  const {
    deletePost,
    data,
    isLoading: deletePostLoading,
    error: deletePostError,
    isSuccess,
  } = useDeletePost();
  const dropdownSelected = (value: number) => {
    if (value == MENU.Delete) setDeleteModalOpen(true);
  };
  const handleDeletePost = () => {
    if (post) deletePost(post.id);
  };
  enum MENU {
    Edit,
    Delete,
    Report,
  }
  useEffect(() => {
    if (isSuccess) {
      alert('게시물이 정상적으로 삭제되었습니다.');
      setDeleteModalOpen(false);
      navigate(-1);
    }
    if (deletePostError) {
      alert('오류가 발생하였습니다.');
    }
    setShowMore(false);
  }, [error, isSuccess]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      // 클릭 이벤트가 Dropdown 내부가 아닌 경우 Dropdown 닫기
      setShowMore(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside); // 외부 클릭 이벤트 감지
    return () => {
      document.removeEventListener('click', handleClickOutside); // 컴포넌트 언마운트 시 이벤트 핸들러 해제
    };
  }, []);
  return (
    <>
      <TopAppBar title="댓글" background={'white'} />
      <div className="flex flex-col border-b border-custom-background-200 border-b-custom-gray-300 py-[1.3rem]">
        <div className="flex items-center justify-between px-[2.5rem]">
          <PostUserProfile
            nickname={post ? post.user.nickname : ''}
            age={age}
            color="gray"
          />
          <div className="relative" ref={dropdownRef}>
            <MoreIcon className="cursor-pointer" onClick={handleClickMore} />
            {showMore && (
              <Dropdown
                options={
                  user?.id === post?.user.id
                    ? [
                        { value: MENU.Edit, label: '게시물 수정' },
                        { value: MENU.Delete, label: '게시물 삭제' },
                      ]
                    : [{ value: MENU.Report, label: '게시물 신고' }]
                }
                onSelect={dropdownSelected}
                className="right-0 top-[2.9rem] mt-0"
              />
            )}
          </div>
        </div>
        <PostDetailContent title={post?.title} content={post?.content} />
        <div className="flex w-full px-[2.5rem]">
          <div className="relative mr-[1rem] flex">
            {post?.worryFiles &&
              post.worryFiles.map((image) => (
                <img
                  key={image.url}
                  src={image.url}
                  alt={'업로드 이미지'}
                  className="mr-[1rem] h-[7.1rem] w-[7.1rem] object-cover"
                />
              ))}
          </div>
        </div>
      </div>
      <div className="box-border h-3/5 overflow-y-scroll py-[0.5rem]">
        {comments?.map((comment) => {
          return (
            <>
              <CommentBox
                key={comment.id}
                className1="pl-[5.5rem] pr-[2.5rem]"
                comment={comment}
                postId={post ? post.id : -1}
                isWriter={comment.user.id === post?.user.id}
                isCommentWriter={comment.user.id === user?.id ? true : false}
                setAddChildComment={setAddChildComment}
              />
              {comment.childReplies.length > 0 &&
                comment.childReplies.map((childComment) => (
                  <CommentBox
                    key={childComment.id}
                    className="pl-[5.5rem]"
                    className1="pl-[8.5rem] pr-[2.5rem]"
                    comment={childComment}
                    postId={post ? post.id : -1}
                    parentCommentId={comment.id}
                    isWriter={childComment.user.id === post?.user.id}
                    isCommentWriter={
                      childComment.user.id === user?.id ? true : false
                    }
                    setAddChildComment={setAddChildComment}
                  />
                ))}
            </>
          );
        })}
      </div>
      <CommentInputWrapper
        userId={user ? user.id : NaN}
        worryId={post ? post.id : NaN}
        setAddChildComment={setAddChildComment}
        addChildComment={addChildComment}
      />
      <Popup
        isOpen={deleteModalOpen}
        text="게시물을 삭제하시겠습니까?"
        subText="이 작업은 실행 취소할 수 없습니다."
        buttonLabel="게시물 삭제"
        onCancel={() => setDeleteModalOpen(false)}
        onClickButton={handleDeletePost}
      />
    </>
  );
}
