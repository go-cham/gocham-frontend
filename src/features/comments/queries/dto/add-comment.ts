export interface AddCommentRequest {
  content: string;
  userId: number;
  worryId: number;
  nestingReplyId: number | null;
  mentionUserId: number | null;
}

export interface AddCommentResponse {
  id: number;
  status: number;
  createdAt: number;
  updatedAt: number;
  etc: string;
  content: string;
  mentionUser: {
    birthDate: string;
    createdAt: string;
    email: string | null;
    etc: string;
    id: number;
    job: string;
    joinStatus: string;
    joinedAt: string;
    kakaoId: string;
    marketingAcceptedAt: string;
    nickname: string;
    phoneNumber: string | null;
    privacyAcceptedAt: string;
    profileImageUrl: string;
    realName: string;
    reason: string;
    sex: string;
    status: string;
    termsOfUseAcceptedAt: string;
    updatedAt: string;
    vendor: string;
    worryChoice: {
      id: number;
      label: string;
      sequenceNumber: number;
      isAbstained: string;
    } | null;
  };
}
