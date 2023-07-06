export interface EditProfileRequest {
  nickname: string;
  birthDate: string;
  job: string;
  sex: string;
  residenceId: number;
  userId: number;
  worryCategories: number[];
}

export interface EditProfileResponse {
  id: number;
}
