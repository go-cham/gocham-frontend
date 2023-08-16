export interface AcceptTermsRequest {
  userId: number;
  privacyAcceptedStatus: number;
  termsOfUseAcceptedStatus: number;
}

export interface AcceptTermsResponse {
  id: number;
}
