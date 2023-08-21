export interface PostFormData {
  title: string;
  content: string;
  images: {
    id?: number;
    url: string;
  }[];
  categoryId?: number;
  deadline?: number;
  voteOptions: {
    label: string;
    image: string | null;
  }[];
}
