export interface CommentBoxType {
  comment:
    | {
        id: number;
        status: string;
        createdAt: string;
        updatedAt: string;
        content: string;
        childReplies: {
          content: string;
          createdAt: string;
          id: number;
          updatedAt: string;
          user: {
            id: number;
            nickname: string;
            birthDate: string;
            email: string | null;
            phoneNumber: string | null;
            worryChoice: {
              id: number;
              label: string;
              sequenceNumber: number;
              isAbstained: string;
            } | null;
          };
        }[]; // TODO
        user: {
          id: number;
          nickname: string;
          birthDate: string;
          email: string | null;
          phoneNumber: string | null;
          profileImageUrl: string | null;
          worryChoice: {
            id: number;
            label: string;
            sequenceNumber: number;
            isAbstained: string;
          } | null;
        };
      }
    | {
        content: string;
        createdAt: string;
        id: number;
        updatedAt: string;
        user: {
          id: number;
          nickname: string;
          birthDate: string;
          email: string | null;
          phoneNumber: string | null;
          worryChoice: {
            id: number;
            label: string;
            sequenceNumber: number;
            isAbstained: string;
          } | null;
        };
      };
  parentCommentId?: number;
  className?: string;
  className1?: string;
  postId: number;
  isWriter: boolean;
  isCommentWriter: boolean;
  setAddChildComment: React.Dispatch<
    React.SetStateAction<{
      addChild: boolean;
      nestingReplyId: number;
      nickName: string;
    }>
  >;
}
