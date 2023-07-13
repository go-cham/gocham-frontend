import { Navigate, Route, Routes } from 'react-router-dom';

import Banner from '@/components/Banner';
import Layout from '@/components/layout/Layout';
import ModalController from '@/components/modal/ModalController';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { RouteURL } from '@/constants/route-url';
import useUpdate from '@/hooks/useUpdate';
import CollectInformationPage from '@/pages/collect-information/CollectInformationPage';
import EditProfilePage from '@/pages/edit-profile/EditProfilePage';
import FeedPage from '@/pages/feed/FeedPage';
import FeedReportPage from '@/pages/feed/FeedReportPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import LoginOauthKakaoPage from '@/pages/login/kakao/LoginOauthKakaoPage';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import RegisterTermPage from '@/pages/register/RegisterTermPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import UnregisterPage from '@/pages/unregister/UnregisterPage';
import UserPage from '@/pages/user/UserPage';
import WritePage from '@/pages/write/WritePage';
import RouteChangeTracker from '@/utils/RouteChangeTracker';

export default function App() {
  const { showUpdate, applyUpdate } = useUpdate();

  return (
    <Layout>
      <Banner show={showUpdate} applyUpdate={applyUpdate} />
      <ModalController />
      <RouteChangeTracker />
      <Routes>
        <Route path={RouteURL.home} element={<HomePage />} />
        <Route
          path={RouteURL.collect_information}
          element={<CollectInformationPage />}
        />
        <Route path={RouteURL.feed_star} element={<FeedPage />} />
        <Route path={RouteURL.feed_report} element={<FeedReportPage />} />
        <Route path={RouteURL.feed_route_star} element={<FeedPage />} />
        <Route path={RouteURL.feed_edit} element={<WritePage />} />
        <Route path={RouteURL.login} element={<LoginPage />} />
        <Route
          path={RouteURL.login_oauth_kakao}
          element={<LoginOauthKakaoPage />}
        />
        <Route path={RouteURL.register_term} element={<RegisterTermPage />} />
        <Route path={RouteURL.onboarding} element={<OnboardingPage />} />
        <Route path={RouteURL.write} element={<WritePage />} />
        <Route path={RouteURL.user} element={<UserPage />} />
        <Route path={RouteURL.edit_profile} element={<EditProfilePage />} />
        <Route path={RouteURL.settings} element={<SettingsPage />} />
        <Route path={RouteURL.unregister} element={<UnregisterPage />} />
        <Route path={RouteURL.not_found} element={<Navigate to={'/'} />} />
      </Routes>
    </Layout>
  );
}
