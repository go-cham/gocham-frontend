export interface Job {
  id: number;
  label: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  etc: string | null;
}
