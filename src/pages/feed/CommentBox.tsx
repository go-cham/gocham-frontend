import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import useDeleteComment from '@/apis/hooks/posts/useDeleteComment';
import useGetMyChoice from '@/apis/hooks/posts/useGetMyChoice';
import PostUserProfile from '@/components/post/PostUserProfile';
import Popup from '@/components/ui/modal/Popup/Popup';
import { calculateAgeFromBirthday } from '@/utils/date/calculateAge';
import commentTime from '@/utils/date/commentTime';
import { formatText } from '@/utils/formatText';

import { CommentBoxType } from './CommentBoxType';

export default function CommentBox({
  comment,
  postId,
  isWriter,
  parentCommentId,
  className,
  className1,
  isCommentWriter,
  setAddChildComment,
}: CommentBoxType) {
  const { deleteComment, data, isLoading, error, isSuccess } =
    useDeleteComment();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const addCommentClicked = () => {
    setAddChildComment({
      addChild: true,
      nestingReplyId: parentCommentId ? parentCommentId : comment.id,
      nickName: comment.user.nickname,
    });
  };
  const commentDeleteClicked = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteComment = () => {
    deleteComment(comment.id);
  };
  const commentReportClicked = () => {
    navigate(`/comment/${comment.id}/report`, {
      state: {
        content: comment.content,
        nickName: comment.user.nickname,
        postId,
      },
    });
  };
  const {
    choice,
    isLoading: getMyChoiceLoading,
    error: getMyChoiceError,
  } = useGetMyChoice({ postId, userId: comment.user.id });
  return (
    <div className="border-custom-background-200 flex flex-col border-b py-[1.3rem]">
      <div
        className={twMerge(
          'flex items-center justify-between px-[2.5rem]',
          className
        )}
      >
        <div className="flex items-center space-x-[0.5rem]">
          <PostUserProfile
            nickname={comment.user.nickname}
            age={calculateAgeFromBirthday(comment.user.birthDate)}
            color="gray"
          />
          <div className="bg-gray1 h-[0.3rem] w-[0.3rem] rounded-full"></div>
          {isWriter ? (
            <div className="border-text2 text-text2 rounded-3xl border px-[0.7rem] py-[0.5rem] text-[1rem] font-medium">
              작성자
            </div>
          ) : (
            <div className="text-body1 text-gray-800">
              {!parentCommentId
                ? comment.user.worryChoice
                  ? comment.user.worryChoice.label
                  : isWriter
                  ? null
                  : '투표 항목 없음'
                : choice
                ? choice.label
                : '투표 항목 없음'}
            </div>
          )}
        </div>
        {isCommentWriter ? (
          <div
            className="text-custom-text-500 text-body2"
            onClick={commentDeleteClicked}
          >
            삭제
          </div>
        ) : (
          <div
            className="text-custom-text-500 text-body2"
            onClick={commentReportClicked}
          >
            신고
          </div>
        )}
      </div>
      <p
        className={twMerge(
          'text-custom-gray-800 mb-[1.7rem] mt-[0.8rem] break-words text-body3',
          className1
        )}
      >
        {formatText(comment.content)}
      </p>
      <div
        className={twMerge(
          'text-custom-text-500 flex justify-between text-body2',
          className1
        )}
      >
        <span onClick={addCommentClicked}>답글달기</span>
        <span>{commentTime(comment.createdAt)}</span>
      </div>
      <Popup
        isOpen={deleteModalOpen}
        text="댓글을 삭제하시겠습니까?"
        subText="이 작업은 실행 취소할 수 없습니다."
        buttonLabel="댓글 삭제"
        onCancel={() => setDeleteModalOpen(false)}
        onClickButton={handleDeleteComment}
      />
    </div>
  );
}
