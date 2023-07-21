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
  mentionUser,
  className,
  className1,
  isCommentWriter,
  setAddChildComment,
}: CommentBoxType) {
  const { deleteComment } = useDeleteComment();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const addCommentClicked = () => {
    setAddChildComment({
      addChild: true,
      nestingReplyId: parentCommentId ? parentCommentId : comment.id,
      nickName: comment.user.nickname,
      mentionUserId: comment.user.id,
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
  const { choice } = useGetMyChoice({ postId, userId: comment.user.id });

  const choiceLabel = comment.user.worryChoice?.label || choice?.label;

  return (
    <div className="flex flex-col pb-[1.5rem] pt-[1.7rem]">
      <div
        className={twMerge(
          'flex items-center justify-between px-[2.5rem]',
          className
        )}
      >
        <div className="flex items-center space-x-[6px]">
          <PostUserProfile
            nickname={comment.user.nickname}
            age={calculateAgeFromBirthday(comment.user.birthDate)}
            color="gray"
          />
          {choiceLabel && (
            <div className="flex items-center space-x-[6px]">
              <div className="h-[0.3rem] w-[0.3rem] rounded-full bg-[#cccfd4]"></div>
              <span className="accent-text-subTitle-700 font-system-body1">
                {choiceLabel}
              </span>
            </div>
          )}
          {isWriter && (
            <span className="rounded-[15px] border border-[#676A72] px-[0.7rem] py-[0.5rem] text-[#676A72] font-system-caption">
              작성자
            </span>
          )}
        </div>
        {isCommentWriter ? (
          <div
            className="text-text-explain-500 font-system-body2"
            onClick={commentDeleteClicked}
          >
            삭제
          </div>
        ) : (
          <div
            className="text-text-explain-500 font-system-body2"
            onClick={commentReportClicked}
          >
            신고
          </div>
        )}
      </div>
      <p
        className={twMerge(
          'mb-[1.7rem] mt-[0.8rem] break-words text-text-subTitle-700 font-system-body4',
          className1
        )}
      >
        {mentionUser ? (
          <span className="mr-[0.5rem] text-mainSub-main-500">
            @ {mentionUser.nickname}
          </span>
        ) : null}
        {formatText(comment.content)}
      </p>
      <div
        className={twMerge(
          'text-custom-text-500 flex justify-between text-body2',
          className1
        )}
      >
        <span
          className="text-text-explain-500 font-system-body2"
          onClick={addCommentClicked}
        >
          답글달기
        </span>
        <span className="text-text-explain-500 font-system-body1">
          {commentTime(comment.createdAt)}
        </span>
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
