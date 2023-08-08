export type GetCommentsResponse = {
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
    mentionUser: {
      email: string | null;
      id: number;
      nickname: string;
      phoneNumber: string | null;
      profileImageUrl: string | null;
    };
    user: {
      id: number;
      nickname: string;
      birthDate: string;
      email: string;
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
    email: string;
    phoneNumber: string | null;
    profileImageUrl: string | null;
    worryChoice: {
      id: number;
      label: string;
      sequenceNumber: number;
      isAbstained: string;
    } | null;
  };
}[];
