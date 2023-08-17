export interface EditProfileRequest {
  nickname: string;
  birthDate: string;
  job: string;
  gender: string;
  residenceId: number;
  userId: number;
  worryCategories: number[] | null;
}

export interface EditProfileResponse {
  id: number;
}
