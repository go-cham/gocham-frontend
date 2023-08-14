import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Route, Routes } from 'react-router-dom';

import Banner from '@/components/Banner';
import IosInstallGuide from '@/components/IosInstallGuide';
import Layout from '@/components/layout/Layout';
import useRouteChangeTracker from '@/hooks/useRouteChangeTracker';
import useUpdate from '@/hooks/useUpdate';

const HomePage = lazy(() => import('@/pages/home/HomePage'));
const CollectInformationPage = lazy(
  () => import('@/pages/register/CollectInformationPage'),
);
const FeedPage = lazy(() => import('@/pages/feed/FeedPage'));
const FeedReportPage = lazy(() => import('@/pages/feed/FeedReportPage'));
const CommentPage = lazy(() => import('@/pages/comment/CommentPage'));
const CommentReportPage = lazy(
  () => import('@/pages/comment/CommentReportPage'),
);
const EditPage = lazy(() => import('@/pages/edit/EditPage'));
const LoginPage = lazy(() => import('@/pages/login/LoginPage'));
const LoginOauthKakaoPage = lazy(
  () => import('@/pages/login/LoginOauthKakaoPage'),
);
const RegisterTermPage = lazy(
  () => import('@/pages/register/RegisterTermPage'),
);
const WritePage = lazy(() => import('@/pages/write/WritePage'));
const UserPage = lazy(() => import('@/pages/user/UserPage'));
const EditProfilePage = lazy(() => import('@/pages/settings/SettingsPage'));
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'));
const UnregisterPage = lazy(() => import('@/pages/unregister/UnregisterPage'));

export default function App() {
  const { showUpdate, applyUpdate } = useUpdate();
  useRouteChangeTracker();

  return (
    <Layout>
      <ErrorBoundary
        fallback={<h1>error!!</h1>}
        onError={(error) => console.log(error)}
      >
        <Banner show={showUpdate} applyUpdate={applyUpdate} />
        <IosInstallGuide />
        <Suspense fallback={null}>
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/feed/:id'} element={<FeedPage />} />
            <Route path={'/feed/:id/:route'} element={<FeedPage />} />
            <Route path={'/feed/:id/edit'} element={<EditPage />} />
            <Route path={'/feed/:id/report'} element={<FeedReportPage />} />
            <Route path={'/feed/:id/comment'} element={<CommentPage />} />
            <Route path={'/write'} element={<WritePage />} />
            <Route path={'/user'} element={<UserPage />} />
            <Route path={'/edit-profile'} element={<EditProfilePage />} />
            <Route path={'/settings'} element={<SettingsPage />} />
            <Route
              path={'/comment/:id/report'}
              element={<CommentReportPage />}
            />
            <Route path={'/login'} element={<LoginPage />} />
            <Route
              path={'/login/oauth/kakao'}
              element={<LoginOauthKakaoPage />}
            />
            <Route
              path={'/collect-information'}
              element={<CollectInformationPage />}
            />
            <Route path={'/register/term'} element={<RegisterTermPage />} />
            <Route path={'/unregister'} element={<UnregisterPage />} />
            <Route path={'/*'} element={<Navigate to={'/'} />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}
