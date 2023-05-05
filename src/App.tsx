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
import Feed from "./_pages/feed/Feed";
import ApiConfig, { HttpMethod } from "./dataManager/apiConfig";
import { EndPoint } from "./dataManager/apiMapper";
import getUserInfo from "./utils/getUserInfo";
import { useAtom } from "jotai";
import { userAtom } from "./atom/userData";
import Settings from "./_components/feed/Settings";

const defaultCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 84.4rem;
  max-width: 39rem; */
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  max-width: 100vw;
  /* max-height: 100vh; */
  overflow: hidden;
`;
export const RouteURL = {
  home: "/",
  post: "/post", // 포스트 상세
  login: "/login",
  login_oauth_kakao: "/login/oauth/kakao",
  register_term: "/register/term",
  onboarding: "/onboarding",
  write: "/write",
  collect_information: "/collect-information",
  feed: "/feed/*",
  settings: "/settings",
  not_found: "/*",
};

function App() {
  console.log(process.env.NODE_ENV);
  const [userData, setUserData] = useAtom(userAtom);

  useEffect(() => {
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
    <div css={defaultCSS}>
      <BrowserRouter>
        <Routes>
          <Route path={RouteURL.home} element={<Home />} />
          <Route
            path={RouteURL.collect_information}
            element={<CollectInformation />}
          />

          <Route path={RouteURL.login} element={<Login />} />
          <Route
            path={RouteURL.login_oauth_kakao}
            element={<LoginOauthKakao />}
          />
          <Route path={RouteURL.register_term} element={<RegisterTerm />} />
          <Route path={RouteURL.onboarding} element={<Onboarding />} />
          <Route path={RouteURL.write} element={<Write />} />
          <Route path={RouteURL.feed} element={<Feed />} />
          <Route path={RouteURL.settings} element={<Settings />} />
          <Route path={RouteURL.not_found} element={<Navigate to={"/"} />} />
        </Routes>
        <GNBHOC />
      </BrowserRouter>
    </div>
  );
}

export default App;
