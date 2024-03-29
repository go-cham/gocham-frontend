export type GetPostResponse = {
  expirationTime: string | null;
  id: number;
  createdAt: string;
  updatedAt: string | null;
  title: string;
  content: string;
  worryFiles: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    etc: string;
    url: string;
    contentType: string;
  }[];
  user: {
    email: string;
    phoneNumber: string | null;
    profileImageUrl: string | null;
    id: number;
    nickname: string;
    birthDate: string;
  };
  replyCount: number;
  userWorryChoiceCount: number;
  worryChoices: {
    id: number;
    isAbstained: 'yes' | 'no';
    label: string;
    sequenceNumber: number;
    url: string | null;
  }[];
  worryCategory: {
    id: number;
    label: string;
    description: string;
  };
};
