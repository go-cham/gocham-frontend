export interface PostFormData {
  title: string;
  content: string;
  images: {
    id?: number;
    file: File;
    url: string;
  }[];
  categoryId?: number;
  deadline?: number;
  voteOptions: {
    label: string;
    image: {
      file: File;
      url: string;
    } | null;
  }[];
}
