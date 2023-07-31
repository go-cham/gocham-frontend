export interface AcceptTermsRequest {
  userId: number;
  privacyAcceptedStatus: number;
  termsOfUseAcceptedStatus: number;
  marketingAcceptedStatus: number;
}

export interface AcceptTermsResponse {
  id: number;
}
