/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import { MainView } from "../../style/common";
import VoteComponent from "../../_components/vote/VoteComponent";

const H1 = css`
  margin-top: 4rem;
  font-weight: 700;
  font-size: 2.7rem;
`;

const main = () => {
  return (
    <div css={MainView}>
      <h1 css={H1}>고민의 참견</h1>
      <VoteComponent />
    </div>
  );
};

export default main;
