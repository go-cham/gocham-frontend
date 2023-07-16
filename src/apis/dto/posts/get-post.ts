export type GetPostResponse = {
  expirationTime: string | null;
  id: number;
  createdAt: string;
  updatedAt: string | null;
  title: string;
  content: string;
  worryFiles:{
    id:number;
    status:string;
    createdAt:string;
    updatedAt:string;
    etc:string;
    url:string;
    contentType:string;
  }[];
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
