import { Navigate } from 'react-router-dom';

import { USER_TYPE } from '@/common/constants/user-type';
import { useUser } from '@/features/user/queries/useUser';

type AuthOption = {
  block: 'unauthenticated' | 'activated';
};

// TODO: deactivatedUser, dormantUser 유저 처리
export const withAuth =
  (WrappedComponent: React.FC, { block }: AuthOption) =>
  // eslint-disable-next-line react/display-name
  () => {
    const { user, isLoading } = useUser();
    if (isLoading) {
      return null;
    }
    if (block === 'unauthenticated') {
      if (user?.type === 'onceUserWithoutTerms') {
        return <Navigate to={'/register/term'} />;
      }
      if (user?.type === 'onceUser') {
        return <Navigate to={'/collect-information'} />;
      }
      if (!user) {
        return <Navigate to={'/login'} />;
      }
    }

    if (block === 'activated') {
      if (user && user.type === USER_TYPE.ACTIVATED_USER) {
        return <Navigate to={'/'} />;
      }
    }

    return <WrappedComponent />;
  };
