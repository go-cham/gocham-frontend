export type GetUsersChoices = {
  userWorryChoiceCount: number;
  id: number;
  label: string | null;
  sequenceNumber: number;
  isAbstained: 'yes' | 'no';
}[];
