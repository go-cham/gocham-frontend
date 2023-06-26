export interface AddCommentsRequest {
  content: string;
  userId: number;
  worryId: number;
}

export interface AddCommentsResponse {
  content: string;
  user: {
    email: string;
    phoneNumber: string | null;
    profileImageUrl: string | null;
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string | null;
    etc: string | null;
    kakaoId: number;
    realName: string | null;
    nickname: string;
    birthDate: string;
    sex: string;
    privacyAcceptedAt: string | null;
    termsOfUseAcceptedAt: string | null;
    marketingAcceptedAt: string | null;
    joinStatus: string;
    joinedAt: string;
    vendor: string;
  };
  worry: {
    expirationTime: string | null;
    id: number;
    createdAt: string;
    updatedAt: string | null;
    title: string;
    content: string;
    user: {
      email: string | null;
      phoneNumber: string | null;
      profileImageUrl: string | null;
      id: number;
      nickname: string;
    };
  };
  nestingReply: null;
  createdAt: string;
  etc: string | null;
  id: number;
}
