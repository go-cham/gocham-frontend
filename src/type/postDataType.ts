export type postDataType = {
  id: number;
  createdAt?: string;
  updatedAt?: string | null;
  title?: string;
  content?: string;
  expirationTime?: string;
  worryFiles?: any;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
  replyCount: number;
  userWorryChoiceCount: number;
};
