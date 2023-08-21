import { User } from '../types';

const USER_LOCAL_STORAGE_KEY = 'GOCHAM-USER';

export const userLocalStorage = {
  saveUser: (user: User) => {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
  },
  getUser: (): User | null => {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  },
};
