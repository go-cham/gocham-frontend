import { useEffect, useState } from 'react';
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
import CommentChildrenBox from './CommentChildrenBox';
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
          <div className="relative">
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
          return comment.user.id === post?.user.id ? (
            <>
              <CommentBox
                key={comment.id}
                postId={post.id}
                commentId={comment.id}
                nickName={comment.user.nickname}
                content={comment.content}
                voteContent={
                  comment.user.worryChoice
                    ? comment.user.worryChoice.label
                    : null
                }
                isWriter={true}
                createdAt={comment.createdAt}
                isCommentWriter={comment.user.id === user?.id ? true : false}
                setAddChildComment={setAddChildComment}
              />
              {comment.childReplies.length > 0 &&
                comment.childReplies.map((childComment) => (
                  <CommentChildrenBox
                    key={childComment.id}
                    postId={post.id}
                    userId={childComment.user.id}
                    parentCommentId={comment.id}
                    commentId={childComment.id}
                    content={childComment.content}
                    createdAt={childComment.createdAt}
                    nickName={childComment.user.nickname}
                    birthDate={childComment.user.birthDate}
                    isCommentWriter={
                      childComment.user.id === user?.id ? true : false
                    }
                    isWriter={childComment.user.id === post.user.id}
                    setAddChildComment={setAddChildComment}
                  />
                ))}
            </>
          ) : (
            <>
              <CommentBox
                key={comment.id}
                postId={post ? post.id : -1}
                commentId={comment.id}
                nickName={comment.user.nickname}
                content={comment.content}
                voteContent={
                  comment.user.worryChoice
                    ? comment.user.worryChoice.label
                    : null
                }
                comment={true}
                createdAt={comment.createdAt}
                isCommentWriter={comment.user.id === user?.id ? true : false}
                setAddChildComment={setAddChildComment}
              />
              {comment.childReplies.length > 0 &&
                comment.childReplies.map((childComment) => (
                  <CommentChildrenBox
                    key={childComment.id}
                    parentCommentId={comment.id}
                    postId={post ? post.id : -1}
                    userId={childComment.user.id}
                    commentId={childComment.id}
                    content={childComment.content}
                    createdAt={childComment.createdAt}
                    nickName={childComment.user.nickname}
                    birthDate={childComment.user.birthDate}
                    isCommentWriter={
                      childComment.user.id === user?.id ? true : false
                    }
                    isWriter={childComment.user.id === post?.user.id}
                    comment={true}
                    setAddChildComment={setAddChildComment}
                  />
                ))}
              ;
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
