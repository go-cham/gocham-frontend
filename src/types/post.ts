export type PostDataType = {
  id: number;
  createdAt?: string;
  updatedAt?: string | null;
  title: string;
  content: string;
  expirationTime?: string;
  worryFiles?: any;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  replyCount: number;
  userWorryChoiceCount: number;
};

export type PostingMetaDataType = {
  take: number;
  total?: number;
  hasNextData?: boolean;
  nextId?: number;
};
