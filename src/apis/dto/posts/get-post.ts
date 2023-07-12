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
  worryChoices: {
    id: number;
    isAbstained: 'yes' | 'no';
    label: string;
    sequenceNubmer: number;
    url: string | null;
  }[];
  worryCategory: {
    id: number;
    label: string;
    description: string;
  };
  worryFiles: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string | null;
    etc: string | null;
    url: string;
    contentType: string;
  }[];
};
