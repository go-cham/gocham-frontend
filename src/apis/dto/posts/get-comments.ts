export type GetCommentsResponse = {
  id: number;
  content: string;
  createdAt: string;
  user: {
    email: string | null;
    phoneNumber: string | null;
    profileImageUrl: string | null;
    id: number;
    nickname: string;
    worryChoice: {
      id: number;
      label: string;
      isAbstained: string;
    } | null;
  };
  childReplies: any[]; // TODO
}[];
