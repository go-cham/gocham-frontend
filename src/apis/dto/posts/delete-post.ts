export type DeletePostResponse = {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  title: string;
  expirationTime: string | null;
  content: string;
  worryFiles: [
    {
      id: number;
      status: string;
      createdAt: string;
      updatedAt: string | null;
      etc: string | null;
      url: string;
      contentType: string;
    }
  ];
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  replyCount: number;
  userWorryChoiceCount: number;
};
