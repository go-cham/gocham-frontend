export type ChooseOptionRequest = {
  userId: number;
  worryChoiceId: number;
};

export type ChooseOptionResponse = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  etc: string | null;
};
