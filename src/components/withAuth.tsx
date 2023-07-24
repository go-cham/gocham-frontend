import { Navigate } from 'react-router-dom';

import useUser from '@/apis/hooks/users/useUser';
import { RouteURL } from '@/constants/route-url';
import { userType } from '@/constants/userTypeEnum';

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
      if (user?.type === 'onceUser') {
        return <Navigate to={RouteURL.collect_information} />;
      }
      if (!user) {
        return <Navigate to={RouteURL.login} />;
      }
    }

    if (block === 'activated') {
      if (user && user.type === userType.activatedUser) {
        return <Navigate to={RouteURL.home} />;
      }
    }

    return <WrappedComponent />;
  };

export default withAuth;
