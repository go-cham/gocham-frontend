export type Post = {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  title: string;
  content: string;
  expirationTime: string | null;
  worryFiles: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string | null;
    etc: string | null;
    url: string;
    contentType: string;
  }[];
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    birthday: string;
  };
  replyCount: number;
  userWorryChoiceCount: number;
};

export interface PostFormData {
  title: string;
  content: string;
  images: {
    id?: number;
    url: string;
  }[];
  categoryId?: number;
  deadline?: number;
  voteOptions: {
    label: string;
    image: string | null;
  }[];
}
