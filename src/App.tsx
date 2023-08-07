import { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { Navigate, Route, Routes } from 'react-router-dom';

import Banner from '@/components/Banner';
import IosInstallGuide from '@/components/IosInstallGuide';
import Layout from '@/components/layout/Layout';
import { RouteURL } from '@/constants/route-url';
import useUpdate from '@/hooks/useUpdate';
import CollectInformationPage from '@/pages/collect-information/CollectInformationPage';
import EditProfilePage from '@/pages/edit-profile/EditProfilePage';
import EditPage from '@/pages/edit/EditPage';
import FeedPage from '@/pages/feed/FeedPage';
import FeedReportPage from '@/pages/feed/FeedReportPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import LoginOauthKakaoPage from '@/pages/login/kakao/LoginOauthKakaoPage';
import RegisterTermPage from '@/pages/register/RegisterTermPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import UnregisterPage from '@/pages/unregister/UnregisterPage';
import UserPage from '@/pages/user/UserPage';
import WritePage from '@/pages/write/WritePage';
import { isIOS } from '@/utils/environment';
import RouteChangeTracker from '@/utils/routeChangeTracker';

import CommentPage from './pages/comment/CommentPage';
import CommentReportPage from './pages/report/CommentReportPage';

export default function App() {
  const { showUpdate, applyUpdate } = useUpdate();
  const initialSizeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!initialSizeRef.current && window.visualViewport) {
      initialSizeRef.current = window.visualViewport.height;
    }

    const handleResize = () => {
      if (!isMobile) return;
      if (!window.visualViewport || !initialSizeRef.current) return;

      if (isIOS()) {
        const currentHeight = window.visualViewport.height;
        const diff = initialSizeRef.current - currentHeight;
        if (currentHeight < initialSizeRef.current) {
          document.body.style.marginTop = diff + 'px';
        } else {
          document.body.style.marginTop = '0px';
        }
        document.body.style.height = currentHeight + 'px';
      } else {
        const currentHeight = window.visualViewport.height;
        document.body.style.height = currentHeight + 'px';
      }
    };

    window.visualViewport?.addEventListener('resize', handleResize);

    return () =>
      window.visualViewport?.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      <Banner show={showUpdate} applyUpdate={applyUpdate} />
      <RouteChangeTracker />
      <IosInstallGuide />
      <Routes>
        <Route path={RouteURL.home} element={<HomePage />} />
        <Route
          path={RouteURL.collect_information}
          element={<CollectInformationPage />}
        />
        <Route path={RouteURL.feed_star} element={<FeedPage />} />
        <Route path={RouteURL.feed_report} element={<FeedReportPage />} />
        <Route path={RouteURL.comment_report} element={<CommentReportPage />} />
        <Route path={RouteURL.feed_route_star} element={<FeedPage />} />
        <Route path={RouteURL.feed_edit} element={<EditPage />} />
        <Route path={RouteURL.login} element={<LoginPage />} />
        <Route
          path={RouteURL.login_oauth_kakao}
          element={<LoginOauthKakaoPage />}
        />
        <Route path={RouteURL.register_term} element={<RegisterTermPage />} />
        <Route path={RouteURL.write} element={<WritePage />} />
        <Route path={RouteURL.user} element={<UserPage />} />
        <Route path={RouteURL.edit_profile} element={<EditProfilePage />} />
        <Route path={RouteURL.settings} element={<SettingsPage />} />
        <Route path={RouteURL.unregister} element={<UnregisterPage />} />
        <Route path={RouteURL.feed_comment} element={<CommentPage />} />
        <Route path={RouteURL.not_found} element={<Navigate to={'/'} />} />
      </Routes>
    </Layout>
  );
}
