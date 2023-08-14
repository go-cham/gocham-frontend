import { Navigate } from 'react-router-dom';

import useUser from '@/apis/hooks/users/useUser';
import { UserType } from '@/constants/user-type';

type AuthOption = {
  block: 'unauthenticated' | 'activated';
};

// TODO: deactivatedUser, dormantUser 유저 처리
const withAuth =
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
      if (user && user.type === UserType.activatedUser) {
        return <Navigate to={'/'} />;
      }
    }

    return <WrappedComponent />;
  };

export default withAuth;
