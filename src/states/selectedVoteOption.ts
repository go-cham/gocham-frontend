import { atom } from 'jotai';

export const selectedVoteOptionAtom = atom<{
  id: number;
  inView: boolean;
} | null>(null);
