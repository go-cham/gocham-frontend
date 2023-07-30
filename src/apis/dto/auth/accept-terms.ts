export interface AcceptTermsRequest {
  userId: number;
  privacyAcceptedStatus: 0 | 1;
  termsOfUseAcceptedStatus: 0 | 1;
  marketingAcceptedStatus: 0 | 1;
}

export interface AcceptTermsResponse {
  id: number;
}
