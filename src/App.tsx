import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Route, Routes } from 'react-router-dom';

import Banner from '@/components/Banner';
import IosInstallGuide from '@/components/IosInstallGuide';
import Layout from '@/components/layout/Layout';
import { RouteURL } from '@/constants/route-url';
import useUpdate from '@/hooks/useUpdate';
import RouteChangeTracker from '@/utils/routeChangeTracker';

const HomePage = lazy(() => import('@/pages/home/HomePage'));
const CollectInformationPage = lazy(
  () => import('@/pages/collect-information/CollectInformationPage'),
);
const FeedPage = lazy(() => import('@/pages/feed/FeedPage'));
const FeedReportPage = lazy(() => import('@/pages/feed/FeedReportPage'));
const CommentReportPage = lazy(
  () => import('@/pages/report/CommentReportPage'),
);
const EditPage = lazy(() => import('@/pages/edit/EditPage'));
const LoginPage = lazy(() => import('@/pages/login/LoginPage'));
const LoginOauthKakaoPage = lazy(
  () => import('@/pages/login/kakao/LoginOauthKakaoPage'),
);
const RegisterTermPage = lazy(
  () => import('@/pages/register/RegisterTermPage'),
);
const WritePage = lazy(() => import('@/pages/write/WritePage'));
const UserPage = lazy(() => import('@/pages/user/UserPage'));
const EditProfilePage = lazy(() => import('@/pages/settings/SettingsPage'));
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'));
const UnregisterPage = lazy(() => import('@/pages/unregister/UnregisterPage'));
const CommentPage = lazy(() => import('@/pages/comment/CommentPage'));

export default function App() {
  const { showUpdate, applyUpdate } = useUpdate();

  return (
    <Layout>
      <ErrorBoundary
        fallback={<h1>error!!</h1>}
        onError={(error) => console.log(error)}
      >
        <Banner show={showUpdate} applyUpdate={applyUpdate} />
        <RouteChangeTracker />
        <IosInstallGuide />
        <Suspense fallback={null}>
          <Routes>
            <Route path={RouteURL.home} element={<HomePage />} />
            <Route
              path={RouteURL.collect_information}
              element={<CollectInformationPage />}
            />
            <Route path={RouteURL.feed_star} element={<FeedPage />} />
            <Route path={RouteURL.feed_report} element={<FeedReportPage />} />
            <Route
              path={RouteURL.comment_report}
              element={<CommentReportPage />}
            />
            <Route path={RouteURL.feed_route_star} element={<FeedPage />} />
            <Route path={RouteURL.feed_edit} element={<EditPage />} />
            <Route path={RouteURL.login} element={<LoginPage />} />
            <Route
              path={RouteURL.login_oauth_kakao}
              element={<LoginOauthKakaoPage />}
            />
            <Route
              path={RouteURL.register_term}
              element={<RegisterTermPage />}
            />
            <Route path={RouteURL.write} element={<WritePage />} />
            <Route path={RouteURL.user} element={<UserPage />} />
            <Route path={RouteURL.edit_profile} element={<EditProfilePage />} />
            <Route path={RouteURL.settings} element={<SettingsPage />} />
            <Route path={RouteURL.unregister} element={<UnregisterPage />} />
            <Route path={RouteURL.feed_comment} element={<CommentPage />} />
            <Route path={RouteURL.not_found} element={<Navigate to={'/'} />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}
