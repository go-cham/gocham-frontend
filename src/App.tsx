import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Banner } from '@/components/Banner';
import GNBHOC from '@/components/layout/GNBHOC';
import Layout from '@/components/layout/Layout';
import ModalController from '@/components/modal/ModalController';
import { RouteURL } from '@/constants/route-url';
import useUpdate from '@/hooks/useUpdate';
import AuthCheckPage from '@/pages/auth-check/AuthCheckPage';
import CollectInformationPage from '@/pages/collect-information/CollectInformationPage';
import EditProfilePage from '@/pages/edit-profile/EditProfilePage';
import FeedPage from '@/pages/feed/FeedPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import LoginOauthKakaoPage from '@/pages/login/kakao/LoginOauthKakaoPage';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import RegisterTermPage from '@/pages/register/RegisterTermPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import UserPage from '@/pages/user/UserPage';
import WritePage from '@/pages/write/WritePage';
import { userAtom } from '@/states/userData';

import Auth from './components/Auth';
import RouteChangeTracker from './utils/RouteChangeTracker';
import getUserInfo from './utils/getUserInfo';

function App() {
  const [userData, setUserData] = useAtom(userAtom);
  const { showUpdate, applyUpdate } = useUpdate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      // 로그인 여부를 확인하는 함수 호출
      const userInfo = await getUserInfo();
      if (userInfo !== 'null') {
        setUserData(userInfo);
      } else {
        setUserData((value) => ({ ...value, userId: 0 }));
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <>
      <Banner show={showUpdate} applyUpdate={applyUpdate} />
      <Layout>
        <ModalController />
        <RouteChangeTracker />
        <Routes>
          <Route path={RouteURL.home} element={<HomePage />} />
          <Route
            path={RouteURL.collect_information}
            element={<CollectInformationPage />}
          />
          <Route
            path={RouteURL.feed_star}
            element={<Auth SpecificComponent={FeedPage} requiredLogin={true} />}
          />
          <Route
            path={RouteURL.feed_route_star}
            element={<Auth SpecificComponent={FeedPage} requiredLogin={true} />}
          />
          <Route
            path={RouteURL.login}
            element={
              <Auth SpecificComponent={LoginPage} requiredLogin={false} />
            }
          />
          <Route
            path={RouteURL.login_oauth_kakao}
            element={<LoginOauthKakaoPage />}
          />
          <Route path={RouteURL.register_term} element={<RegisterTermPage />} />
          <Route path={RouteURL.onboarding} element={<OnboardingPage />} />
          <Route
            path={RouteURL.write}
            element={
              <Auth SpecificComponent={WritePage} requiredLogin={true} />
            }
          />
          <Route
            path={RouteURL.user}
            element={<Auth SpecificComponent={UserPage} requiredLogin={true} />}
          />
          <Route
            path={RouteURL.edit_profile}
            element={
              <Auth SpecificComponent={EditProfilePage} requiredLogin={true} />
            }
          />
          <Route path={RouteURL.settings} element={<SettingsPage />} />
          <Route
            path={RouteURL.auth_check}
            element={
              <Auth SpecificComponent={AuthCheckPage} requiredLogin={true} />
            }
          />
          <Route path={RouteURL.not_found} element={<Navigate to={'/'} />} />
        </Routes>
        <GNBHOC />
      </Layout>
    </>
  );
}

export default App;
