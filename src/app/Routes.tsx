import { Suspense, lazy } from 'react';
import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import { useRouteChangeTracker } from '@/common/hooks/useRouteChangeTracker';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { useUser } from '@/features/user/queries';

const HomePage = lazy(() => import('@/pages/home/HomePage'));
const CollectInformationPage = lazy(
  () => import('@/pages/register/CollectInformationPage'),
);
const FeedPage = lazy(() => import('@/pages/feed/FeedPage'));
const FeedReportPage = lazy(() => import('@/pages/feed-report/FeedReportPage'));
const CommentPage = lazy(() => import('@/pages/comment/CommentPage'));
const CommentReportPage = lazy(
  () => import('@/pages/comment-report/CommentReportPage'),
);
const EditPostPage = lazy(() => import('@/pages/edit-post/EditPostPage'));
const LoginPage = lazy(() => import('@/pages/login/LoginPage'));
const LoginOauthKakaoPage = lazy(
  () => import('@/pages/login/LoginOauthKakaoPage'),
);
const RegisterTermPage = lazy(
  () => import('@/pages/register/RegisterTermPage'),
);
const WritePage = lazy(() => import('@/pages/write/WritePage'));
const UserPage = lazy(() => import('@/pages/user/UserPage'));
const EditProfilePage = lazy(
  () => import('@/pages/edit-profile/EditProfilePage'),
);
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'));
const UnregisterPage = lazy(() => import('@/pages/unregister/UnregisterPage'));

export default function Routes() {
  const { user } = useUser();
  useRouteChangeTracker();

  return (
    <Suspense fallback={null}>
      <ReactRouterRoutes>
        {/* 공개 페이지 */}
        <Route path={'/'} element={<HomePage />} />
        {/* 로그인한 유저만 접근 가능한 페이지 */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={user?.joinStatus === 'activated'}
              redirectPath={!user ? '/login' : '/register/term'}
            />
          }
        >
          <Route path={'/feed/:id'} element={<FeedPage />} />
          <Route path={'/feed/:id/:route'} element={<FeedPage />} />
          <Route path={'/feed/:id/edit'} element={<EditPostPage />} />
          <Route path={'/feed/:id/report'} element={<FeedReportPage />} />
          <Route path={'/feed/:id/comment'} element={<CommentPage />} />
          <Route path={'/write'} element={<WritePage />} />
          <Route path={'/user'} element={<UserPage />} />
          <Route path={'/edit-profile'} element={<EditProfilePage />} />
          <Route path={'/settings'} element={<SettingsPage />} />
          <Route path={'/comment/:id/report'} element={<CommentReportPage />} />
          <Route path={'/unregister'} element={<UnregisterPage />} />
        </Route>
        {/* 로그인 안한 유저만 접근 가능한 페이지 */}
        <Route
          element={<ProtectedRoute isAllowed={!user} redirectPath={'/'} />}
        >
          <Route path={'/login'} element={<LoginPage />} />
          <Route
            path={'/login/oauth/kakao'}
            element={<LoginOauthKakaoPage />}
          />
        </Route>
        {/* 가입이 완료되지 않은 유저만 접근 가능한 페이지 */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={user?.joinStatus === 'deactivated'}
              redirectPath={'/'}
            />
          }
        >
          <Route path={'/register/term'} element={<RegisterTermPage />} />
          <Route
            path={'/collect-information'}
            element={<CollectInformationPage />}
          />
        </Route>
        <Route path={'/*'} element={<Navigate to={'/'} />} />
      </ReactRouterRoutes>
    </Suspense>
  );
}
