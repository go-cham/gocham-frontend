/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import react from "react";
import { useLocation } from "react-router-dom";
import GNB from "./GNB";
import { RouteURL } from "../../App";

const GNBHOC = () => {
  const location = useLocation();
  console.log(location);

  const HOC = () => {
    if (
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes(RouteURL.onboarding) ||
      location.pathname.includes(RouteURL.write) ||
      location.pathname.includes(RouteURL.collect_information) ||
      location.pathname.includes(RouteURL.settings) ||
      location.pathname.includes(RouteURL.post)
    )
      return null;
    else return <GNB />;
  };
  return <>{HOC()}</>;
};

export default GNBHOC;
