import { useState } from 'react';

import useDeleteComment from '@/apis/hooks/posts/useDeleteComment';
import useDeletePost from '@/apis/hooks/posts/useDeletePost';
import useGetMyChoice from '@/apis/hooks/posts/useGetMyChoice';
import PostUserProfile from '@/components/post/PostUserProfile';
import Popup from '@/components/ui/modal/Popup/Popup';
import { calculateAgeFromBirthday } from '@/utils/date/calculateAge';
import commentTime from '@/utils/date/commentTime';

import { CommentBoxType } from './CommentBoxType';
import { PostDetailContent } from './PostDetail/PostDetail';

interface commentChildrenBoxI {
  content: string;
  parentCommentId: number;
  postId: number;
  userId: number;
  commentId: number;
  createdAt: string;
  nickName: string;
  birthDate: string;
  isCommentWriter: boolean;
  isWriter?: boolean;
  comment?: boolean;
  setAddChildComment: React.Dispatch<
    React.SetStateAction<{
      addChild: boolean;
      nestingReplyId: number;
      nickName: string;
    }>
  >;
}

export default function CommentChildrenBox({
  content,
  parentCommentId,
  postId,
  userId,
  commentId,
  createdAt,
  nickName,
  birthDate,
  isCommentWriter,
  isWriter,
  comment,
  setAddChildComment,
}: commentChildrenBoxI) {
  const { deleteComment, data, isLoading, error, isSuccess } =
    useDeleteComment();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const addCommentClicked = () => {
    setAddChildComment({
      addChild: true,
      nestingReplyId: parentCommentId,
      nickName,
    });
  };
  const commentDeleteClicked = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteComment = () => {
    deleteComment(commentId);
  };
  const {
    choice,
    isLoading: getMyChoiceLoading,
    error: getMyChoiceError,
  } = useGetMyChoice({ postId, userId });
  return (
    <div className="flex flex-col border-b border-custom-background-200 py-[1.3rem]">
      <div className="flex items-center justify-between pl-[5.5rem] pr-[2.5rem]">
        <PostUserProfile
          nickname={nickName}
          age={calculateAgeFromBirthday(birthDate)}
          color="gray"
          comment={comment}
          isWriter={isWriter}
          voteContent={choice?.label}
        />
        {isCommentWriter ? (
          <div onClick={commentDeleteClicked} className="text-body2">
            삭제
          </div>
        ) : (
          <div className="text-body2">신고</div>
        )}
      </div>
      <PostDetailContent className="pl-[6rem]" content={content} />
      <div className="flex justify-between pl-[8.5rem] pr-[2.5rem] text-body2 text-custom-text-500">
        <span onClick={addCommentClicked}>답글달기</span>
        <span>{commentTime(createdAt)}</span>
      </div>
      <Popup
        isOpen={deleteModalOpen}
        text="답글을 삭제하시겠습니까?"
        subText="이 작업은 실행 취소할 수 없습니다."
        buttonLabel="답글 삭제"
        onCancel={() => setDeleteModalOpen(false)}
        onClickButton={handleDeleteComment}
      />
    </div>
  );
}
