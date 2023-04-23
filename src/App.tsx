/** @jsxImportSource @emotion/react */

import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { css } from "@emotion/react";
import GNB from "./components/common/GNB";
import Login from "./pages/login/Login";
import GNBHOC from "./components/common/GNBHOC";
import RegisterTerm from "./pages/login/RegisterTerm";
import Onboarding from "./pages/login/Onboarding";

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
  login: "login",
  register_term: "/register/term",
  onboarding: "/onboarding",
};
function App() {
  return (
    <div css={defaultCSS}>
      <BrowserRouter>
        <Routes>
          <Route path={RouteURL.home} element={<Home />} />
          <Route path={RouteURL.login} element={<Login />} />
          <Route path={RouteURL.register_term} element={<RegisterTerm />} />
          <Route path={RouteURL.onboarding} element={<Onboarding />} />
        </Routes>
        <GNBHOC />
      </BrowserRouter>
    </div>
  );
}

export default App;
