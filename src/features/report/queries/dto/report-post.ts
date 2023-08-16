export type ReportPostRequest = {
  userId: number;
  worryId: number;
  reasonId: number;
};

export type ReportPostResponse = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  etc: string | null;
  reason: string;
};
