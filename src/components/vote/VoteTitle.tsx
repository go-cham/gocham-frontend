/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import UserProfile from "../common/UserProfile";

const VoteTitleCss = css`
  height: 30.7rem;

  background: #f5f7fb;
  border-radius: 0.5rem 0.5rem 0px 0px;
`;

const VoteTitle = () => {
  return (
    <div css={VoteTitleCss}>
      <UserProfile />
    </div>
  );
};

export default VoteTitle;
