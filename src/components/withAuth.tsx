import { Navigate } from 'react-router-dom';

import useUser from '@/apis/hooks/users/useUser';
import { RouteURL } from '@/constants/route-url';
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
    console.log(user?.type);

    if (isLoading) {
      return null;
    }
    if (block === 'unauthenticated') {
      if (user?.type === 'onceUserWithoutTerms') {
        return <Navigate to={RouteURL.register_term} />;
      }
      if (user?.type === 'onceUser') {
        return <Navigate to={RouteURL.collect_information} />;
      }
      if (!user) {
        return <Navigate to={RouteURL.login} />;
      }
    }

    if (block === 'activated') {
      if (user && user.type === UserType.activatedUser) {
        return <Navigate to={RouteURL.home} />;
      }
    }

    return <WrappedComponent />;
  };

export default withAuth;
