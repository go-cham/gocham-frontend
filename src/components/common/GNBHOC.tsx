/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import react from "react";
import { useLocation } from "react-router-dom";
import GNB from "./GNB";

const GNBHOC = () => {
  const location = useLocation();
  console.log(location);

  const HOC = () => {
    if (
      location.pathname === "/login" ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/onboarding")
    )
      return <></>;
    else return <GNB />;
  };
  return <>{HOC()}</>;
};

export default GNBHOC;
