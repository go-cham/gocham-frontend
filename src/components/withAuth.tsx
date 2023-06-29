import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const { user, isLoading } = useUser();

    if (isLoading) {
      return null;
    }
    if (block === 'unauthenticated') {
      if (!user) {
        navigate(RouteURL.login);
      }
    }

    if (block === 'activated') {
      if (user && user.type === userType.activatedUser) {
        navigate(RouteURL.home);
      }
    }

    return <WrappedComponent />;
  };

export default withAuth;
