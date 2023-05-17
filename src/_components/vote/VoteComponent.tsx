/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useEffect } from "react";
import VoteTitle from "./VoteTitle";
import VoteContentComponent from "./VoteContentComponent";
import styled from "@emotion/styled";

type VoteComponentProps = {
  isActivePWA: boolean;
};
const VoteComponentCss = styled.div<VoteComponentProps>`
  position: absolute;
  width: 34rem;
  height: 53.3rem;
  //top: 14rem;
  //top: 15vh;
  // 세로 길이가 작은 폰때문에 vh로 조정

  top: ${(props) => (props.isActivePWA ? "15vh" : "10vh")};

  background: #ffffff;
  /* Drop Shadow */

  box-shadow: 0px 0px 25px rgba(42, 45, 55, 0.1);
  border-radius: 5px;
`;

const VoteComponent = () => {
  let activePwa: boolean = false;
  useEffect(() => {
    activePwa = isActivePWA();
  }, []);
  const isActivePWA = (): boolean => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      // console.log("PWA 모드");
      return true;
    } else {
      // console.log("브라우저 모드. 컴퓨터로 들어가면 이상함");
      return false;
    }
  };
  return (
    <VoteComponentCss isActivePWA={activePwa}>
      {activePwa ? "PWA" : "브라우저"}
      <VoteTitle />
      <VoteContentComponent />
    </VoteComponentCss>
  );
};

export default VoteComponent;
