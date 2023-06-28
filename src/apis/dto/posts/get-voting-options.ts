export type GetVotingOptions = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  etc: string | null;
  label: string;
  sequenceNumber: number;
  isAbstained: 'yes' | 'no';
}[];
