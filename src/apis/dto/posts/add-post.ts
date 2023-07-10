export interface AddPostRequest {
  title: string;
  expirationTime: string;
  content: string;
  userId: number;
  worryCategoryId: number;
  choices: {
    label: string;
    url:string;
    sequenceNumber: number;
  }[];
  files: {
    url: string;
    contentType: string;
  }[];
}

export interface AddPostResponse {
  id:number;
  updatedAt: string;
  etc: string | null;
  title: string;
  expirationTime: string;
  content: string;
  worryFiles: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string ;
    etc: string;
    url: string;
    contentType: string;
  };
  worryReports: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string ;
    etc: string;
    reason: string
  };
}
