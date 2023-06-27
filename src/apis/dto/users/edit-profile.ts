export interface EditProfileRequest {
  nickname: string;
  birthDate: string;
  jobId: number;
  sex: string;
  residenceId: number;
  userId: number;
  worryCategories: number[];
}

export interface EditProfileResponse {
  id: number;
}
