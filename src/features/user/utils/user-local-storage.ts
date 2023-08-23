import { GetUserResponse } from '@/features/user/queries/dto/get-user';

const USER_LOCAL_STORAGE_KEY = 'GOCHAM-USER';
const USER_UPDATED_AT_STORAGE_KEY = 'GOCHAM-USER-UPDATED-AT';

export const userLocalStorage = {
  saveUser: (user: GetUserResponse) => {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(
      USER_UPDATED_AT_STORAGE_KEY,
      String(new Date().getTime()),
    );
  },
  getUser: (): GetUserResponse | null => {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  },

  getUserUpdatedAt: () => {
    const updatedAt = localStorage.getItem(USER_UPDATED_AT_STORAGE_KEY);
    return updatedAt ? Number(updatedAt) : null;
  },

  removeUser: () => {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  },
};
