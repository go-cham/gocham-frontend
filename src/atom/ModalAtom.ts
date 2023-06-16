import { atom } from 'jotai';
import { ModalCase } from '../constants/modalEnum';

const initialUserData = ModalCase.None;

export const ModalHanlderAtom = atom<ModalCase>(initialUserData);
