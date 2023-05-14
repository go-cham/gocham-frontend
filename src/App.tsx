/** @jsxImportSource @emotion/react */

import React, { useEffect, useMemo } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./_pages/home/Home";
import { css } from "@emotion/react";
import GNB from "./_components/common/GNB";
import Login from "./_pages/login/Login";
import GNBHOC from "./_components/common/GNBHOC";
import RegisterTerm from "./_pages/login/RegisterTerm";
import Onboarding from "./_pages/login/Onboarding";
import Write from "./_pages/write/Write";
import CollectInformation from "./_pages/collectInformation/CollectInformation";
import LoginOauthKakao from "./_pages/login/LoginOauthKakao";
import User from "./_pages/user/User";
import getUserInfo from "./utils/getUserInfo";
import { useAtom } from "jotai";
import { userAtom } from "./atom/userData";
import Settings from "./_pages/user/Settings";
import Auth from "./HOC/Auth";
import Feed from "./_pages/home/Feed";
import AuthCheckPage from "./_pages/AuthCheckPage";
import EditProfile from "./_pages/user/EditProfile";
import styled from "@emotion/styled";
import { MAX_WIDTH } from "./constants/viewSize";
import RouteChangeTracker from "./utils/RouteChangeTracker";
import BackgroundImage from "./images/background.png";
import BackgroundNoCharImage from "./images/background_nocharVer.png";

// 모바일 크기 처리
const OuterWrap = styled.div`
  @media screen and (min-width: 1300px) {
    background-image: url(${BackgroundImage});
  }

  @media screen and (max-width: 1300px) {
    background-image: url(${BackgroundNoCharImage});
  }
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const DefaultCSS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${MAX_WIDTH};
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
  overflow: hidden;
  margin: 0 auto;

  @media screen and (min-width: 1300px) {
    padding-left: 50rem;
  }

  @media screen and (max-width: 1300px) {
    padding-left: 0;
  }
`;

const BackgroundColor = styled.div`
  width: 100%;
  background-color: white;
`;

export const RouteURL = {
  home: "/",
  feed: "/feed",
  feed_star: "/feed/:id", // 포스트 상세
  feed_route_star: "/feed/:id/:route", // 포스트 상세
  login: "/login",
  login_oauth_kakao: "/login/oauth/kakao",
  register_term: "/register/term",
  onboarding: "/onboarding",
  write: "/write",
  collect_information: "/collect-information",
  user: "/user",
  settings: "/settings",
  edit_profile: "/edit-profile",
  not_found: "/*",
  auth_check: "/auth-check",
};

function App() {
  const [userData, setUserData] = useAtom(userAtom);

  useEffect(() => {
    const checkLoginStatus = async () => {
      // 로그인 여부를 확인하는 함수 호출
      const userInfo = await getUserInfo();
      if (userInfo !== "null") {
        setUserData(userInfo);
      } else {
        setUserData((value) => ({ ...value, userId: 0 }));
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <OuterWrap>
      <DefaultCSS>
        <BackgroundColor>
          <BrowserRouter>
            <RouteChangeTracker />
            <Routes>
              <Route path={RouteURL.home} element={<Home />} />
              <Route
                path={RouteURL.collect_information}
                element={<CollectInformation />}
              />
              <Route
                path={RouteURL.feed_star}
                element={<Auth SpecificComponent={Feed} requiredLogin={true} />}
              />
              <Route
                path={RouteURL.feed_route_star}
                element={<Auth SpecificComponent={Feed} requiredLogin={true} />}
              />
              <Route
                path={RouteURL.login}
                element={
                  <Auth SpecificComponent={Login} requiredLogin={false} />
                }
              />
              <Route
                path={RouteURL.login_oauth_kakao}
                element={<LoginOauthKakao />}
              />
              <Route path={RouteURL.register_term} element={<RegisterTerm />} />
              <Route path={RouteURL.onboarding} element={<Onboarding />} />
              <Route
                path={RouteURL.write}
                element={
                  <Auth SpecificComponent={Write} requiredLogin={true} />
                }
              />
              <Route
                path={RouteURL.user}
                element={<Auth SpecificComponent={User} requiredLogin={true} />}
              />
              <Route
                path={RouteURL.edit_profile}
                element={
                  <Auth SpecificComponent={EditProfile} requiredLogin={true} />
                }
              />
              <Route path={RouteURL.settings} element={<Settings />} />
              <Route
                path={RouteURL.not_found}
                element={<Navigate to={"/"} />}
              />
              <Route
                path={RouteURL.auth_check}
                element={
                  <Auth
                    SpecificComponent={AuthCheckPage}
                    requiredLogin={true}
                  />
                }
              />
            </Routes>
            <GNBHOC />
          </BrowserRouter>
        </BackgroundColor>
      </DefaultCSS>
    </OuterWrap>
  );
}

export default App;
