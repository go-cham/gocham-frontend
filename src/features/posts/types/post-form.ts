export interface PostFormData {
  title: string;
  content: string;
  images: {
    id?: number;
    file: File | null;
    url: string;
  }[];
  categoryId?: number;
  deadline?: number;
  voteOptions: {
    label: string;
    image: {
      file: File | null;
      url: string | null;
    } | null;
  }[];
}
