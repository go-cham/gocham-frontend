export type EditPostRequest = {
  id: number;
  title: string;
  content: string;
  worryCategoryId: number;
  files: {
    id?: number;
    url: string;
    contentType: string;
  }[];
};

export type EditPostResponse = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string | null;
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
};
