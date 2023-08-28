import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import useRouteChangeTracker from '@/common/hooks/useRouteChangeTracker';
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';
import useUser from '@/features/user/queries/useUser';
import CommentReportPage from '@/pages/comment-report/CommentReportPage';
import CommentPage from '@/pages/comment/CommentPage';
import EditPostPage from '@/pages/edit-post/EditPostPage';
import EditProfilePage from '@/pages/edit-profile/EditProfilePage';
import FeedReportPage from '@/pages/feed-report/FeedReportPage';
import FeedPage from '@/pages/feed/FeedPage';
import HomePage from '@/pages/home/HomePage';
import LoginOauthKakaoPage from '@/pages/login/LoginOauthKakaoPage';
import LoginPage from '@/pages/login/LoginPage';
import CollectInformationPage from '@/pages/register/CollectInformationPage';
import RegisterTermPage from '@/pages/register/RegisterTermPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import UnregisterPage from '@/pages/unregister/UnregisterPage';
import UserPage from '@/pages/user/UserPage';
import WritePage from '@/pages/write/WritePage';

export default function Routes() {
  const { user } = useUser();
  useRouteChangeTracker();

  return (
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
      <Route element={<ProtectedRoute isAllowed={!user} redirectPath={'/'} />}>
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/login/oauth/kakao'} element={<LoginOauthKakaoPage />} />
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
  );
}
