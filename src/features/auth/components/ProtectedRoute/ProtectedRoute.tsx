import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath: string;
}

export function ProtectedRoute({
  isAllowed,
  redirectPath,
}: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
