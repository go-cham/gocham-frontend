export interface Comment {
  id: number;
  createdAt: string;
  content: string;
  user: {
    id: number;
    email: string;
    profileImage: string | null;
    nickname: string;
    birthDate: string;
    choice: {
      id: number;
      label: string;
      isAbstained: boolean;
    } | null;
  };
  replies: {
    id: number;
    createdAt: string;
    content: string;
    to: {
      id: number;
      nickname: string;
    };
    user: {
      id: number;
      email: string;
      profileImage: string | null;
      nickname: string;
      birthDate: string;
      choice: {
        id: number;
        label: string;
        isAbstained: boolean;
      } | null;
    };
  }[];
}
