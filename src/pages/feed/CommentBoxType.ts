export interface CommentBoxType {
  postId: number;
  content: string;
  commentId: number;
  comment?: boolean;
  isWriter?: boolean;
  isCommentWriter: boolean;
  nickName: string;
  voteContent: string | null;
  createdAt: string;
  setAddChildComment: React.Dispatch<
    React.SetStateAction<{
      addChild: boolean;
      nestingReplyId: number;
      nickName: string;
    }>
  >;
}
