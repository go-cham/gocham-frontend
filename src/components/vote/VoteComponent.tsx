/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import VoteTitle from "./VoteTitle";
import VoteContentComponent from "./VoteContentComponent";

const VoteComponentCss = css`
  position: absolute;
  width: 34rem;
  height: 53.3rem;
  //top: 14rem;
  top: 15vh;
  // 세로 길이가 작은 폰때문에 vh로 조정

  background: #ffffff;
  /* Drop Shadow */

  box-shadow: 0px 0px 25px rgba(42, 45, 55, 0.1);
  border-radius: 5px;
`;

const VoteComponent = () => {
  return (
    <div css={VoteComponentCss}>
      <VoteTitle />
      <VoteContentComponent />
    </div>
  );
};

export default VoteComponent;
