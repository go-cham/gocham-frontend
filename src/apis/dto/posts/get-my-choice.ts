export type GetMyChoiceResponse = {
  id: number;
  worryChoice: {
    id: number;
    label: string;
    sequenceNumber: number;
    isAbstained: 'yes' | 'no';
  };
};
