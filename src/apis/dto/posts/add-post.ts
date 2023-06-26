export interface AddPostRequest {
  userId: number;
  worryCategoryId: number;
  title: string;
  files: {
    contentType: string;
    url: string;
  }[];
  expirationTime: string | null;
  content: string;
  choices: {
    label: string;
    sequenceNumber: number;
  }[];
}

export interface AddPostResponse {
  expirationTime: string;
  user: {
    email: string;
    phoneNumber: string | null;
    profileImageUrl: string | null;
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    etc: string | null;
    kakaoId: number;
    realName: string | null;
    nickname: string;
    birthDate: string;
    sex: 'male' | 'female';
    privacyAcceptedAt: string;
    termsOfUseAcceptedAt: string;
    marketingAcceptedAt: string | null;
    joinStatus: string;
    joinedAt: string;
    vendor: string;
  };
  title: string;
  content: string;
  worryCategory: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string | null;
    etc: string | null;
    label: string;
    description: string;
  };
  createdAt: string;
  etc: string | null;
  id: number;
}
