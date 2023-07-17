import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDeleteComment from '@/apis/hooks/posts/useDeleteComment';
import useDeletePost from '@/apis/hooks/posts/useDeletePost';
import PostUserProfile from '@/components/post/PostUserProfile';
import Popup from '@/components/ui/modal/Popup/Popup';
import commentTime from '@/utils/date/commentTime';

import { CommentBoxType } from './CommentBoxType';
import { PostDetailContent } from './PostDetail/PostDetail';

export default function CommentBox({
  postId,
  commentId,
  content,
  nickName,
  comment,
  voteContent,
  createdAt,
  isWriter,
  isCommentWriter,
  setAddChildComment,
}: CommentBoxType) {
  const { deleteComment, data, isLoading, error, isSuccess } =
    useDeleteComment();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const addCommentClicked = () => {
    setAddChildComment({ addChild: true, nestingReplyId: commentId, nickName });
  };
  const commentDeleteClicked = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteComment = () => {
    deleteComment(commentId);
  };
  const commentReportClicked = () => {
    navigate(`/comment/${commentId}/report`, {
      state: {
        content,
        nickName,
        postId,
      },
    });
  };
  return (
    <div className="flex flex-col border-b border-custom-background-200 py-[1.3rem]">
      <div className="flex items-center justify-between px-[2.5rem]">
        <PostUserProfile
          nickname={nickName}
          age={20}
          color="gray"
          comment={comment}
          isWriter={isWriter}
          voteContent={voteContent}
        />
        {isCommentWriter ? (
          <div className="text-body2" onClick={commentDeleteClicked}>
            삭제
          </div>
        ) : (
          <div className="text-body2" onClick={commentReportClicked}>
            신고
          </div>
        )}
      </div>
      <PostDetailContent className="pl-[3rem]" content={content} />
      <div className="flex justify-between pl-[5.5rem] pr-[2.5rem] text-body2 text-custom-text-500">
        <span onClick={addCommentClicked}>답글달기</span>
        <span>{commentTime(createdAt)}</span>
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
