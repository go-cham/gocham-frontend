/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";

const UserProfileCss = css`
  position: absolute;
  left: 1.7rem;
  top: 2.1rem;
  display: flex;
  align-items: center;
  & .image {
    background-color: black;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-right: 0.9rem;
  }
`;
const UserProfile = () => {
  return (
    <div css={UserProfileCss}>
      <div className="image"> </div>
      <div>chiruchirubangbang</div>
    </div>
  );
};

export default UserProfile;
