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
import ApiConfig, { HttpMethod } from "./dataManager/apiConfig";
import { EndPoint } from "./dataManager/apiMapper";
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

// 모바일 크기 처리
const OuterWrap = styled.div`
  background-image: url("https://img.freepik.com/free-vector/cute-celebration-background-cute-grid-pattern-with-colorful-bokeh-vector_53876-146719.jpg?w=900&t=st=1683705079~exp=1683705679~hmac=11a850de1c50be14338dc8c280f21a47802f63bc1a63df7aa154bdd240725ea1");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  //width: 100vw;
  position: relative;
`;

const defaultCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${MAX_WIDTH};
  //padding-left: 470px;
  height: calc(var(--vh, 1vh) * 100);

  /* max-height: 100vh; */
  overflow: hidden;
  background-color: white;
  margin: 0 auto;
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
    console.log(process.env.NODE_ENV);
    console.log(navigator.userAgent);
    const checkLoginStatus = async () => {
      // 로그인 여부를 확인하는 함수 호출
      if (userData.userId === null) {
        const userInfo = await getUserInfo();
        setUserData(userInfo);
      }
    };
    checkLoginStatus();
  }, []);
  //
  // const memoizedValue = useMemo(() => {
  //   // 변화가 없으면 유지되는 값
  //   return userData;
  // }, [userData]);

  return (
    <OuterWrap>
      <div css={defaultCSS}>
        <BrowserRouter>
          <Routes>
            <Route path={RouteURL.home} element={<Home />} />
            <Route
              path={RouteURL.collect_information}
              element={<CollectInformation />}
            />
            <Route
              path={RouteURL.feed_star}
              element={<Auth SpecificComponent={Feed} requiredLogin={true} />}
            />{" "}
            <Route
              path={RouteURL.feed_route_star}
              element={<Auth SpecificComponent={Feed} requiredLogin={null} />}
            />
            <Route
              path={RouteURL.login}
              element={<Auth SpecificComponent={Login} requiredLogin={false} />}
            />
            <Route
              path={RouteURL.login_oauth_kakao}
              element={<LoginOauthKakao />}
            />
            <Route path={RouteURL.register_term} element={<RegisterTerm />} />
            <Route path={RouteURL.onboarding} element={<Onboarding />} />
            <Route
              path={RouteURL.write}
              element={<Auth SpecificComponent={Write} requiredLogin={true} />}
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
            <Route path={RouteURL.not_found} element={<Navigate to={"/"} />} />
            <Route
              path={RouteURL.auth_check}
              element={
                <Auth SpecificComponent={AuthCheckPage} requiredLogin={true} />
              }
            />
          </Routes>
          <GNBHOC />
        </BrowserRouter>
      </div>
    </OuterWrap>
  );
}

export default App;
