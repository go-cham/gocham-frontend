export type GetPostResponse = {
  expirationTime: string | null;
  id: number;
  createdAt: string;
  updatedAt: string | null;
  title: string;
  content: string;
  user: {
    email: null;
    phoneNumber: string | null;
    profileImageUrl: string | null;
    id: number;
    nickname: string;
    birthDate: string;
  };
  replyCount: number;
  userWorryChoiceCount: number;
};
