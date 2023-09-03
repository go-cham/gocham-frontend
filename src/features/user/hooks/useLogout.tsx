import { useQueryClient } from '@tanstack/react-query';
import {
  USER_LOCAL_STORAGE_KEY,
  USER_UPDATED_AT_STORAGE_KEY,
} from '@/features/user/utils/user-local-storage';

export default function useLogout() {
  const queryClient = useQueryClient();

  const logout = () => {
    sessionStorage.removeItem('selectMyPostTypeLabel');
    localStorage.removeItem('token');
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    localStorage.removeItem(USER_UPDATED_AT_STORAGE_KEY);
    queryClient.clear();
  };

  return { logout };
}
