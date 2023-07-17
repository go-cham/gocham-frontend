export type ReportCommentRequest = {
  userId: number;
  worryReplyId: number;
  reasonId: number;
};

export type ReportCommentResponse = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  etc: string | null;
  reason: string;
};
