type ChoiceOption = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  etc: string | null;
  label: string | null;
  url: string | null;
  sequenceNumber: number | null;
  isAbstained: 'yes' | 'no';
};

export type GetChoiceOptionsResponse = ChoiceOption[];
