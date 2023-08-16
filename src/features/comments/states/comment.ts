import { atom } from 'jotai';

interface CommentStateAtom {
  postId: number | null;
  replyingTo: {
    id: number;
    nickname: string;
    commentId: number;
  } | null;
  parentCommentId: number | null;
  inputActive: boolean;
}

export const commentStateAtom = atom<CommentStateAtom>({
  postId: null,
  replyingTo: null,
  parentCommentId: null,
  inputActive: false,
});
