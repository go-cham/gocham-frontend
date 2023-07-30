export interface AddPostRequest {
  title: string;
  expirationTime: string | null;
  content: string;
  userId: number;
  worryCategoryId: number;
  choices: {
    label: string;
    url: string | null;
    sequenceNumber: number;
  }[];
  files: {
    url: string;
    contentType: string;
  }[];
}

export interface AddPostResponse {
  id: number;
  updatedAt: string;
  etc: string | null;
  title: string;
  expirationTime: string | null;
  content: string;
  worryFiles: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string | null;
    etc: string | null;
    url: string;
    contentType: string;
  }[];
  worryReports: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string | null;
    etc: string | null;
    reason: string;
  }[];
}
