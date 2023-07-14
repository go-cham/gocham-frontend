export interface GetPostsResponse {
  data: {
    expirationTime: string | null;
    user: {
      profileImageUrl: string | null;
      id: number;
      nickname: string;
      birthDate: string;
    };
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string | null;
    worryFiles: {
      id: number;
      status: string;
      createdAt: string;
      updatedAt: string | null;
      etc: string | null;
      url: string;
      contentType: string;
    }[];
    replyCount: number;
    userWorryChoiceCount: number;
  }[];
  meta: {
    take: number;
    total: number;
    hasNextData: boolean;
    nextId: number | null;
  };
}
